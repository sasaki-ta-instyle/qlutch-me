# qlutch-me

QLUTCH のブランドサイト。Next.js 16 App Router + Vercel + Instagram Graph API。

## ページ構成

- `/` — Instagram @qlutchme の 2025 年以降の投稿タイル（カルーセルは 1 枚ずつ展開、動画は除外、1 時間 ISR）
- `/about` — About
- `/contact` — Contact フォーム（Resend 経由）

## セットアップ

```bash
pnpm install
cp .env.example .env.local  # 環境変数を埋める
pnpm dev                    # http://localhost:3000
pnpm build                  # 本番ビルド
```

## 環境変数

| 変数 | 用途 |
|---|---|
| `IG_LONG_LIVED_TOKEN` | Instagram Graph API 60 日長期トークン |
| `IG_USER_ID` | Instagram Business アカウントの user id |
| `RESEND_API_KEY` | Contact フォーム送信用（Resend） |
| `CONTACT_TO_EMAIL` | 問い合わせ受信先 |
| `CONTACT_FROM_EMAIL` | 送信元（instyle.group ドメインは Resend 認証済み） |

## Instagram Graph API のトークン発行

Sprint 0 の準備:

1. developers.facebook.com で App を作成（Type: Business）
2. Instagram Graph API を有効化
3. @qlutchme（Business アカウント）と Facebook Page を紐付ける
4. Graph API Explorer で `instagram_basic` / `instagram_manage_insights` / `pages_show_list` の権限を取得
5. 短期トークンを長期トークン（60 日）に交換して `.env.local` / Vercel 環境変数に入れる

## 責務分担

- `lib/instagram.ts` — Graph API 呼び出しとカルーセル展開・動画除外・2025 以降フィルタ・降順ソート
- `components/tile-grid.tsx` — タイル描画（1:1 正方形、CSS Grid、レスポンシブ列数）
- `app/actions/send-contact.ts` — Resend 経由の Contact 送信
- `components/budoux.tsx` — 日本語段落の意味区切り改行

## デプロイ

Vercel `sasaki-ta-instyle/qlutch-me`。canonical alias は `https://qlutch-me.vercel.app/`。

```bash
vercel --prod --scope sasaki-ta-instyle --yes
```

DNS 切替は Sprint 1 完了後に `qlutch.me` / `www.qlutch.me` を Vercel に向ける。

## 骨子で入れていないもの（Sprint 2 以降）

- トークン自動リフレッシュ（Vercel Cron + KV）
- `load more` 追加読み込み
- 画像 LQIP / blur プレースホルダ
- 動的 OGP 画像
- 旧 WP パーマリンク → 新 URL の 301 マップ
- 独自ブランド書体（font-pick Skill 経由で決定予定）
- ロゴアセット（現状は "QLUTCH" ワードマーク仮）
