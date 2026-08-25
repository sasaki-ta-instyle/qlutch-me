"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./contact-menu.module.css";

/**
 * Contact のホバーメニュー。
 * PC: マウスオーバーで展開 / モバイル・キーボード: タップ or Enter でトグル。
 */
export function ContactMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Contact
      </button>
      <div
        className={styles.panel}
        role="menu"
        aria-hidden={!open}
        data-open={open || undefined}
      >
        <a
          href="mailto:i@qlutch.me"
          className={styles.item}
          role="menuitem"
          tabIndex={open ? 0 : -1}
        >
          Mail
        </a>
        <a
          href="https://ig.me/m/qlutchme"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.item}
          role="menuitem"
          tabIndex={open ? 0 : -1}
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
