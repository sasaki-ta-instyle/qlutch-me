"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./contact-menu.module.css";

/**
 * Contact のホバーメニュー。
 * PC: マウスオーバーで展開 / モバイル・キーボード: タップ or Enter でトグル。
 */
export function ContactMenu() {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const onWhite = pathname !== "/";

  // ホバー可能デバイス (PC マウス等) だけで mouseenter/leave を使う。
  // SP タップでは iOS の合成 mouseenter → click 順が open→toggle→close になるため、
  // hover ハンドラを繋がず click 1 発でトグルさせる。
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
      data-on-white={onWhite || undefined}
      onMouseEnter={canHover ? () => setOpen(true) : undefined}
      onMouseLeave={canHover ? () => setOpen(false) : undefined}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        CONTACT
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
          MAIL
        </a>
        <a
          href="https://www.instagram.com/qlutchme/"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.item}
          role="menuitem"
          tabIndex={open ? 0 : -1}
        >
          INSTAGRAM
        </a>
      </div>
    </div>
  );
}
