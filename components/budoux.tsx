"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadDefaultJapaneseParser } from "budoux";

/**
 * BudouX で日本語の意味区切りを <wbr> で挿入するラッパ。
 * 対応セレクタ内のテキストのみを対象とし、コード/リンク先文字列などは触らない。
 */
export function Budoux({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const parser = loadDefaultJapaneseParser();
    ref.current
      .querySelectorAll<HTMLElement>("h1, h2, h3, p, li, blockquote")
      .forEach((el) => parser.applyToElement(el));
  }, [children]);

  return (
    <div ref={ref} className="budoux">
      {children}
    </div>
  );
}
