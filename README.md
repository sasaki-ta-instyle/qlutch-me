# qlutch-me

QLUTCH のブランドサイト。Next.js 16 App Router + Vercel + Instagram Graph API。

本番: **https://qlutch.me** / canonical alias `https://qlutch-me.vercel.app`

## ページ構成

- `/` — Instagram @qlutchme の 2025 年以降の投稿タイル（カルーセルは 1 枚ずつ展開、動画は除外、1 時間 ISR）
- `/about` — About（Creators / Core Services / Book / Award / Exhibition / Clients + Projects / Office）

Contact は独立ページを持たず、ヘッダーの `CONTACT` ホバー / タップで **MAIL (`mailto:i@qlutch.me`)** と **Instagram DM (`https://ig.me/m/qlutchme`)** の 2 リンクをドロップダウン表示する（`components/contact-menu.tsx`）。

## セットアップ

```bash
pnpm install
cp .env.example .env.local  # IG_LONG_LIVED_TOKEN と IG_USER_ID を埋める
pnpm dev                    # http://localhost:3000
pnpm build                  # 本番ビルド
```

## 環境変数

| 変数 | 用途 |
|---|---|
| `IG_LONG_LIVED_TOKEN` | Instagram Graph API 60 日長期トークン（`IGAA...` 始まり 150 文字前後） |
| `IG_USER_ID` | Instagram Business アカウントの user id（17 桁数字） |

## Instagram Graph API のトークン発行

現行フロー = **Instagram Login for Business**（Facebook Page 経由ではない）:

1. developers.facebook.com で App を作成（Type: Business）
2. 製品「Instagram」を追加 → 左メニュー **API setup with Instagram Business Login**
3. 「Instagram テスター」タブから **`qlutchme`** を招待
4. Instagram アプリ側で @qlutchme にログイン → 設定 → アカウントセンター → ウェブサイトとアプリ → 保留中の招待を **承認**
5. Facebook 開発者コンソールに戻り「アカウントを追加」→ Instagram 認可
6. **Generate token** で 60 日長期トークンと Instagram User ID が表示される（一度きり）
7. Vercel 環境変数に投入（Dashboard か `vercel env add`）

トークンは 60 日で失効するため、期限前に上記手順で再発行する。将来的には Vercel Cron + KV で自動リフレッシュに置き換え予定。

## 責務分担

- `lib/instagram.ts` — Graph API 呼び出し / カルーセル展開 / 動画除外 / 2025 以降フィルタ / 降順ソート。失敗時は throw して ISR 側に前回成功 HTML を保持させる。
- `components/tile-grid.tsx` — Client Component。タイル（4:5 縦長）→ クリックで全画面モーダル → もう 1 度クリックで Instagram に遷移。iOS 対応の body scroll lock、focus trap、CDN URL 失効時の onError fallback。
- `components/logo-mark.tsx` — Home ページ中央固定のブランドマーク（80% 幅、`filter: brightness(0) invert(1)` で強制白）。
- `components/header.tsx` / `footer.tsx` — Client Component。`usePathname` で Home / About を切替。Home は `mix-blend-mode: difference`、About は素の黒テキスト。
- `components/contact-menu.tsx` — ホバー / タップドロップダウン。`matchMedia("(hover: hover)")` で iOS の合成 mouseenter → click 順を回避。
- `components/nav-link.tsx` — 現在ページの nav に `aria-current="page"` を付ける。
- `components/budoux-global.tsx` — layout に 1 度だけ配置し `main` 内の h1-h4 / p / li / blockquote / td / th 全てに BudouX を適用する。

## デプロイ

Vercel `sasaki-ta-instyle/qlutch-me`。main ブランチへの push で自動デプロイ、手動は:

```bash
vercel --prod --scope sasaki-ta-instyle --yes
```

qlutch.me / www.qlutch.me は GoDaddy DNS が Vercel の `76.76.21.21` / `cname.vercel-dns.com` に向いており、Let's Encrypt SSL は Vercel 側で自動発行。www → apex 301 は `next.config.ts` の `redirects()` で処理。

## Sprint 2 以降

- トークン自動リフレッシュ（Vercel Cron + KV）
- Instagram CDN 署名 URL 失効時の恒久 fallback（現状は onError で当該タイルを隠すだけ）
- `load more` / 無限スクロール
- 動的 OGP 画像（トップは最新 4 タイルの合成、About は固定）
- 旧 WP パーマリンク → 新 URL の 301 マップ（現状は Vercel が 404 を返すだけ）
