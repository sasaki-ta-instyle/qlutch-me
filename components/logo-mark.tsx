import Image from "next/image";
import styles from "./logo-mark.module.css";

/**
 * ビューポートの高さ中央に固定されるブランドマーク（Home 専用）。
 * SVG 内部の fill にかかわらず filter: brightness(0) invert(1) で強制的に白へ倒す。
 * Home ではタイル上にほぼ常時カラフルな下地が来るため、blend ではなく素の白で乗せる。
 * pointer-events: none にしてタイル操作は妨げない。
 */
export function LogoMark() {
  return (
    <div className={styles.wrap} aria-hidden>
      <Image
        src="/logo.svg"
        alt=""
        width={1240}
        height={430}
        preload
        className={styles.img}
      />
    </div>
  );
}
