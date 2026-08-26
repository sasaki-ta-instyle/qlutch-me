import Image from "next/image";
import styles from "./logo-mark.module.css";

/**
 * ビューポートの高さ中央に固定されるブランドマーク。
 * 幅いっぱいに拡大して置き、白（invert）+ mix-blend-mode: difference で
 * 下地の色に応じて自動反転（白地→黒、色地→反転色）でコントラストを取る。
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
        priority
        className={styles.img}
      />
    </div>
  );
}
