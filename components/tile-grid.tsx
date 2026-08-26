"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import type { IgTile } from "@/lib/instagram";
import styles from "./tile-grid.module.css";

export function TileGrid({ tiles }: { tiles: IgTile[] }) {
  const [selected, setSelected] = useState<IgTile | null>(null);

  // Escape で閉じる / モーダル開閉時に body スクロールをロック
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

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
        {tiles.map((tile, index) => (
          <li
            key={tile.id}
            className={styles.item}
            style={{ ["--i" as string]: index } as CSSProperties}
          >
            <button
              type="button"
              className={styles.link}
              onClick={() => setSelected(tile)}
              aria-label={`Instagram 投稿を開く（${tile.timestamp}）`}
            >
              <Image
                src={tile.mediaUrl}
                alt=""
                fill
                sizes="(max-width: 599px) 50vw, (max-width: 819px) 33vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1599px) 20vw, (max-width: 2559px) 16vw, 14vw"
                className={styles.image}
                unoptimized
              />
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <Modal tile={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function Modal({ tile, onClose }: { tile: IgTile; onClose: () => void }) {
  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="投稿プレビュー"
      onClick={onClose}
    >
      <div className={styles.modalContent}>
        {/*
         * 画像は「閉じる」当たり判定の一部。オーバーレイの onClick に任せるので
         * ここでは何もしない（そのままバブリング）。
         * eslint-disable-next-line @next/next/no-img-element
         */}
        <img src={tile.mediaUrl} alt="" className={styles.modalImage} />
        <a
          href={tile.permalink}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.modalHint}
          onClick={(e) => {
            // ヒントだけ「開く」— オーバーレイの close にはバブリングさせない
            e.stopPropagation();
            onClose();
          }}
        >
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
          Click to open on Instagram
        </a>
      </div>
    </div>
  );
}
