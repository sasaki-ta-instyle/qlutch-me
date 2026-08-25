# RESUMING

途中で作業を中断・再開・別 Mac で引き継ぐときの導線。

## 前提

- 場所: `~/Workspace/qlutch-me/`
- Node: 20.9+
- pnpm: 9+
- GitHub: `sasaki-ta-instyle/qlutch-me`（Sprint 0 で作成予定）
- Vercel: `sasaki-ta` scope の `qlutch-me` project（Sprint 0 で作成予定）
- 本番ドメイン: `qlutch.me` / `www.qlutch.me`（Sprint 1 完了後に DNS 切替）

## 進捗のマイルストーン

- [x] **Sprint 1 骨子スキャフォールド**
  - Next.js 16 App Router + TypeScript
  - `/`, `/about`, `/contact` の 3 ページ
  - `lib/instagram.ts` の Graph API クライアント（カルーセル展開 + 動画除外 + 2025 以降 + 降順）
  - タイルグリッド（レスポンシブ 7 段階列数）
  - Contact フォーム（Resend + honeypot + サーバアクション）
  - BudouX 日本語改行
- [ ] **Sprint 0 準備**（ユーザー作業）
  - Meta Developer app 作成
  - IG 長期トークン発行
  - GitHub リポジトリ作成
  - Vercel プロジェクト作成 + 環境変数投入
- [ ] **Sprint 1 仕上げ**
  - ロゴ / ブランドアセット差し替え
  - About / Contact コピー正本
  - font-pick Skill で書体確定
  - Vercel preview → ユーザー確認
- [ ] **DNS 切替**（Lolipop / WP は当面残置）
- [ ] **Sprint 2**（後日）
  - トークン自動リフレッシュ
  - load more / LQIP / OGP / 301 マップ

## よくある詰まりどころ

### タイルが空
- `.env.local` に `IG_LONG_LIVED_TOKEN` と `IG_USER_ID` があるか
- トークンが 60 日以内に発行されたものか（期限切れは Meta Developer で再発行）
- @qlutchme が Business/Creator アカウントで、Facebook Page に連携されているか

### Contact フォーム送信が反映されない
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` が設定されているか
- 未設定なら送信スキップしてコンソール出力のみ（骨子仕様）

### ビルドは通るのにローカル dev で画像 403
- Instagram CDN の URL が失効している。ISR が回った直後は生きているはず。1 時間後に自動更新される。

## 検証コマンド

```bash
pnpm dev              # http://localhost:3000
pnpm build            # 型 + 静的生成まで
pnpm exec tsc --noEmit
```

## 関連ドキュメント

- 骨子プラン: `~/.claude/plans/wp-http-www-qlutch-me-quizzical-donut.md`
- 現行 WP サイト調査結果は上記プランの Context に要約済み
