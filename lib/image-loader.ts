/**
 * 画像最適化 loader — Instagram CDN の signed URL を外部の画像プロキシ
 * (wsrv.nl) 経由で WebP + width 指定に変換する。
 *
 * 選定理由（詳細は inherited-gliding-lemur.md）:
 *   - Vercel Image Optimization は Pro でも 5000 unique/月で足りない
 *     可能性がある。ig signed URL はハッシュが変わるたび別 URL 扱い。
 *   - wsrv.nl は完全無料・登録不要・Cloudflare 経由の CDN。
 *   - 商用 SLA は無いが、qlutch 規模（portfolio）ではオーバースペック不要。
 *   - 停止時は既存の handleImgError → failedIds で該当タイルを非表示にする
 *     フォールバックが components/tile-grid.tsx に実装済みなので白紙にはならない。
 *
 * 差し替え可能性:
 *   将来 wsrv が長期障害を起こしたら、この関数を Cloudinary Fetch API 版
 *   (下記コメントの cloudinaryFetchLoader) に丸ごと入れ替えるだけで済むよう
 *   関数境界を切ってある。
 */
import type { ImageLoader, ImageLoaderProps } from "next/image";

/**
 * wsrv.nl 経由 loader。Next の <Image sizes="..."> から幅を算出して
 * 各 breakpoint 毎に呼ばれ、srcset を自動生成する。
 *
 * パラメータ:
 *   - url: 元画像 URL（Instagram CDN の signed URL をそのまま）
 *   - w: 出力幅 (px)
 *   - output: 出力フォーマット。webp を明示（AVIF は Safari 対応が薄いため回避）
 *   - q: 品質 (0-100)、default 80
 *   - we: "without enlargement" — 元より大きく resize しない
 */
export const wsrvLoader: ImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps): string => {
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    output: "webp",
    q: String(quality ?? 80),
    we: "",
  });
  return `https://wsrv.nl/?${params.toString()}`;
};

/**
 * Cloudinary Fetch API 版（wsrv 障害時の差し替え候補）。
 * NEXT_PUBLIC_CLOUDINARY_CLOUD の設定 + アカウント作成が別途必要。
 * 現状は wsrvLoader を使うので有効化しない。
 *
 * export const cloudinaryFetchLoader: ImageLoader = ({ src, width, quality }) => {
 *   const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD;
 *   const q = quality ?? "auto";
 *   return `https://res.cloudinary.com/${cloud}/image/fetch/f_auto,q_${q},w_${width}/${encodeURIComponent(src)}`;
 * };
 */
