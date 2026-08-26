"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadDefaultJapaneseParser } from "budoux";

/**
 * document 全体 (main) の主要テキスト要素に BudouX を適用するグローバル版。
 * layout.tsx に 1 度だけ置くと全ページで自動的に意味区切り改行が有効になる。
 *
 * usePathname を deps にしてルート遷移ごとに再スキャン。
 * data-budoux-applied で 2 重適用を防止する。
 */

const SELECTORS = "main h1, main h2, main h3, main h4, main p, main li, main blockquote, main td, main th";

export function BudouxGlobal() {
  const pathname = usePathname();

  useEffect(() => {
    const parser = loadDefaultJapaneseParser();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
        if (el.dataset.budouxApplied) return;
        // .datedList の date セル (数字) や、code / 短いラベルはスキップ
        if (el.closest("code, pre, .no-budoux")) return;
        parser.applyToElement(el);
        el.dataset.budouxApplied = "1";
      });
    };

    // 初回スキャン
    scan();

    // 画像等の後追い描画を捉えるための遅延スキャン (念のため 1 回)
    const t = window.setTimeout(scan, 200);

    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
