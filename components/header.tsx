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
    >
      {onWhite && (
        <Link href="/" className={styles.topLink}>
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
