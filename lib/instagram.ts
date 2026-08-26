/**
 * Instagram Graph API クライアント
 *
 * 要件:
 *   - CAROUSEL_ALBUM は children を展開して 1 枚ずつ独立タイル化
 *   - VIDEO は除外
 *   - 2025-01-01 以降のみ
 *   - timestamp 降順ソート
 *
 * Business/Creator アカウント + Instagram Login for Business のトークン前提。
 * IG_LONG_LIVED_TOKEN と IG_USER_ID を env に持つ。
 */

export type IgMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type IgTile = {
  /** children の場合は親カルーセルの id、単体投稿の場合は投稿 id */
  id: string;
  /** 表示用画像 URL（Instagram CDN） */
  mediaUrl: string;
  /** クリック時の遷移先（Instagram permalink） */
  permalink: string;
  /** 投稿日時（ISO 8601） */
  timestamp: string;
  /** 元がカルーセルなら子メディアの位置 */
  carouselIndex?: number;
};

type IgApiMedia = {
  id: string;
  media_type: IgMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_type: IgMediaType;
      media_url?: string;
      permalink?: string;
    }>;
  };
};

type IgApiResponse = {
  data: IgApiMedia[];
  paging?: { next?: string };
};

const CUTOFF = new Date("2025-01-01T00:00:00Z").getTime();
const API_BASE = "https://graph.instagram.com";
const FIELDS = [
  "id",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
  "children{id,media_type,media_url,permalink}",
].join(",");

/**
 * error オブジェクトを "URL / token を含めない" 形にサニタイズ。
 * Node fetch の失敗例外は cause.request.url に query 全文を持つことがあるため、
 * ログや監視ツールに載せる前に必ずこれを通す。
 */
function sanitizeError(error: unknown): string {
  if (error instanceof Error) return error.name + ": " + error.message;
  return "unknown error";
}

/**
 * 直近投稿を取得し、要件どおりにフラット化して返す。
 *
 * - env 未設定（開発初期など）: 空配列を返す（ページは "投稿未取得" 表示で継続）。
 * - 実 API 呼び出しで失敗した場合: **throw** して ISR 側に前回成功の HTML を保持させる。
 *   （空配列を返して ISR に焼き付けると、トークン失効時にトップが 1 時間空になる）。
 */
export async function fetchTiles(limit = 100): Promise<IgTile[]> {
  const token = process.env.IG_LONG_LIVED_TOKEN;
  const userId = process.env.IG_USER_ID;
  if (!token || !userId) {
    // env 未設定は "設定してください" と表示するために空を返す（実運用では起きない想定）
    return [];
  }

  const url = new URL(`${API_BASE}/v21.0/${userId}/media`);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("access_token", token);
  url.searchParams.set("limit", String(limit));

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      // Next.js の ISR に載せる。page 側の revalidate と揃える。
      next: { revalidate: 3600 },
    });
  } catch (error) {
    // Sentry 等に流れうるので URL / token を含めずメッセージだけ
    console.error("[instagram] fetch threw:", sanitizeError(error));
    throw new Error("Instagram Graph API fetch failed");
  }

  if (!res.ok) {
    // res.text() には Graph API の error JSON が入るが、リクエスト URL の
    // 反射はないため token 流出はしない（それでも念のため先頭 500 chars に絞る）。
    const body = await res.text();
    console.error("[instagram] non-2xx", res.status, body.slice(0, 500));
    throw new Error(`Instagram Graph API returned ${res.status}`);
  }

  const json = (await res.json()) as IgApiResponse;
  return flattenAndFilter(json.data ?? []);
}

/**
 * API レスポンスを 1 枚 1 タイルにフラット化 → 動画除外 → 2025 以降 → 降順ソート
 */
export function flattenAndFilter(items: IgApiMedia[]): IgTile[] {
  const tiles: IgTile[] = [];

  for (const item of items) {
    const ts = new Date(item.timestamp).getTime();
    if (Number.isNaN(ts) || ts < CUTOFF) continue;

    if (item.media_type === "IMAGE") {
      if (!item.media_url) continue;
      tiles.push({
        id: item.id,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
      });
      continue;
    }

    if (item.media_type === "CAROUSEL_ALBUM") {
      const children = item.children?.data ?? [];
      children.forEach((child, index) => {
        if (child.media_type !== "IMAGE") return; // 動画子メディア除外
        if (!child.media_url) return;
        tiles.push({
          id: `${item.id}_${child.id}`,
          mediaUrl: child.media_url,
          // 子メディアの permalink は親カルーセルと同一の permalink に飛ばす
          // （Graph API の child.permalink は無い / 空のことがある）
          permalink: item.permalink,
          timestamp: item.timestamp,
          carouselIndex: index,
        });
      });
      continue;
    }

    // VIDEO は落とす
  }

  // 新しい投稿を先頭に。同一投稿内のカルーセル子メディアは元の並び順を保つ。
  tiles.sort((a, b) => {
    if (a.timestamp !== b.timestamp) return a.timestamp < b.timestamp ? 1 : -1;
    return (a.carouselIndex ?? 0) - (b.carouselIndex ?? 0);
  });
  return tiles;
}
