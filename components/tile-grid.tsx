"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type SyntheticEvent,
} from "react";
import type { IgTile } from "@/lib/instagram";
import styles from "./tile-grid.module.css";

export function TileGrid({ tiles }: { tiles: IgTile[] }) {
  const [selected, setSelected] = useState<IgTile | null>(null);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  // モーダルを開いたトリガーボタン参照（閉じたときにフォーカスを戻す）
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (tile: IgTile, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setSelected(tile);
  };

  const closeModal = () => {
    setSelected(null);
    // フォーカスをトリガーへ戻す（次 tick で React が modal を unmount してから）
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleImgError = (id: string) => {
    setFailedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // モーダル表示中の body スクロールロック (iOS Safari 対応: position: fixed 方式)
  useEffect(() => {
    if (!selected) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [selected]);

  const visibleTiles = tiles.filter((t) => !failedIds.has(t.id));

  if (tiles.length === 0) {
    return (
      <p className={styles.empty}>
        投稿が未取得です。Instagram Graph API のトークンを設定してください。
      </p>
    );
  }

  return (
    <>
      <ul className={styles.grid}>
        {visibleTiles.map((tile) => (
          <li key={tile.id} className={styles.item}>
            <button
              type="button"
              className={styles.link}
              onClick={(e) => openModal(tile, e)}
              aria-label={`Instagram 投稿を開く（${tile.timestamp}）`}
            >
              <Image
                src={tile.mediaUrl}
                alt=""
                fill
                sizes="(max-width: 599px) 50vw, (max-width: 819px) 33vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1599px) 20vw, (max-width: 2559px) 16vw, 14vw"
                className={styles.image}
                unoptimized
                onError={() => handleImgError(tile.id)}
              />
            </button>
          </li>
        ))}
      </ul>

      {selected && <Modal tile={selected} onClose={closeModal} />}
    </>
  );
}

function Modal({ tile, onClose }: { tile: IgTile; onClose: () => void }) {
  const hintRef = useRef<HTMLAnchorElement | null>(null);
  const [failed, setFailed] = useState(false);

  // 開いたらヒントリンクに初期フォーカスを置く。Tab が背景タイルへ抜けないように
  // 単一 focusable なので blur したら即座に戻すという最小 focus trap にする。
  useEffect(() => {
    hintRef.current?.focus();
  }, []);

  const onFocusOut = (e: SyntheticEvent) => {
    // relatedTarget が modal 内でない場合、hint に戻す
    const evt = e as unknown as { relatedTarget: Node | null };
    if (!evt.relatedTarget || !e.currentTarget.contains(evt.relatedTarget)) {
      requestAnimationFrame(() => hintRef.current?.focus());
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    // Tab / Shift+Tab は hint に戻す（focusable が 1 個なので実質固定）
    if (e.key === "Tab") {
      e.preventDefault();
      hintRef.current?.focus();
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="投稿プレビュー"
      onClick={onClose}
      onFocus={onFocusOut}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <button
        type="button"
        className={styles.modalBack}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="閉じる"
      >
        <svg
          className={styles.modalHintIcon}
          viewBox="0 0 12 12"
          aria-hidden
          focusable="false"
        >
          {/* ← 左矢印 (横線 + 山) */}
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
        Back
      </button>
      <div className={styles.modalContent}>
        {failed ? (
          <div className={styles.modalFallback}>
            <p>画像を読み込めませんでした。</p>
            <p>Instagram で直接開いてください。</p>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={tile.mediaUrl}
            alt=""
            className={styles.modalImage}
            onError={() => setFailed(true)}
          />
        )}
        <a
          href={tile.permalink}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.modalHint}
          ref={hintRef}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Click to open on Instagram
          <svg
            className={styles.modalHintIcon}
            viewBox="0 0 12 12"
            aria-hidden
            focusable="false"
          >
            {/* 外部リンクを示す ↗ 矢印 (角の直角 + 対角線) */}
            <path
              d="M4 3h5v5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
            <path
              d="M9 3L3.2 8.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
