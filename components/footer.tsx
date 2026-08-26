"use client";

import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

export function Footer() {
  const pathname = usePathname();
  const onWhite = pathname !== "/";
  return (
    <footer className={styles.footer} data-on-white={onWhite || undefined}>
      <span>© QLUTCH / KÏN LLC</span>
    </footer>
  );
}
