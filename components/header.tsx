import Link from "next/link";
import Image from "next/image";
import { ContactMenu } from "./contact-menu";
import { NavLink } from "./nav-link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.mark} aria-label="QLUTCH ホームへ">
        <Image
          src="/logo.svg"
          alt="QLUTCH"
          width={1240}
          height={430}
          priority
          className={styles.logo}
        />
      </Link>
      <nav className={styles.nav} aria-label="サイト内ナビゲーション">
        <NavLink href="/about">ABOUT</NavLink>
        <ContactMenu />
      </nav>
    </header>
  );
}
