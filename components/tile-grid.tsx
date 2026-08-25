import Image from "next/image";
import type { IgTile } from "@/lib/instagram";
import styles from "./tile-grid.module.css";

export function TileGrid({ tiles }: { tiles: IgTile[] }) {
  if (tiles.length === 0) {
    return (
      <p className={styles.empty}>
        投稿が未取得です。Instagram Graph API のトークンを設定してください。
      </p>
    );
  }

  return (
    <ul className={styles.grid}>
      {tiles.map((tile) => (
        <li key={tile.id} className={styles.item}>
          <a
            href={tile.permalink}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
            aria-label={`Instagram 投稿を開く（${tile.timestamp}）`}
          >
            <Image
              src={tile.mediaUrl}
              alt=""
              fill
              sizes="(max-width: 599px) 50vw, (max-width: 819px) 33vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1599px) 20vw, (max-width: 2559px) 16vw, 14vw"
              className={styles.image}
              // Instagram CDN の URL は 24〜48 時間で失効することがあるため、
              // Next.js の画像最適化キャッシュに乗せない。
              unoptimized
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
