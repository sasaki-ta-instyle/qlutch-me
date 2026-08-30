"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactMenu } from "./contact-menu";
import { NavLink } from "./nav-link";
import styles from "./header.module.css";

export function Header() {
  const pathname = usePathname();
  // Home (/) では difference blend の白抜き、それ以外 (About 等) では黒テキスト
  const onWhite = pathname !== "/";
  return (
    <header
      className={styles.header}
      data-on-white={onWhite || undefined}
      /*
       * 【C】ページ遷移 View Transitions 時、Header は動かさない。
       * viewTransitionName で root snapshot から切り離し、CSS で animation:none にする。
       */
      style={{ viewTransitionName: "site-header" }}
    >
      {onWhite && (
        <Link href="/" className={styles.topLink}>
          <svg
            className={styles.topLinkIcon}
            viewBox="0 0 12 12"
            aria-hidden
            focusable="false"
          >
            {/* 左矢印 (横線 + 山) */}
            <path
              d="M10 6H2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
            <path
              d="M5 3L2 6l3 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          TOP
        </Link>
      )}
      <nav className={styles.nav} aria-label="サイト内ナビゲーション">
        <NavLink href="/about">ABOUT</NavLink>
        <ContactMenu />
      </nav>
    </header>
  );
}
