import { ContactMenu } from "./contact-menu";
import { NavLink } from "./nav-link";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="サイト内ナビゲーション">
        <NavLink href="/about">ABOUT</NavLink>
        <ContactMenu />
      </nav>
    </header>
  );
}
