"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import styles from "./footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const onWhite = pathname !== "/";

  const scrollTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={styles.footer}
      data-on-white={onWhite || undefined}
      /* 【C】ページ遷移中も Footer は動かさない。header と同扱い。 */
      style={{ viewTransitionName: "site-footer" }}
    >
      <span>© QLUTCH DIV. / KÏN LLC</span>
      <a href="#top" onClick={scrollTop} className={styles.top}>
        BACK TO TOP
        <svg
          className={styles.topIcon}
          viewBox="0 0 12 12"
          aria-hidden
          focusable="false"
        >
          {/* 上矢印 (縦線 + 山) */}
          <path
            d="M6 2v8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
          <path
            d="M3 5l3-3 3 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </a>
    </footer>
  );
}
