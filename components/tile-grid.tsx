"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
        {tiles.map((tile) => (
          <li key={tile.id} className={styles.item}>
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
  const openOnInstagram = () => {
    window.open(tile.permalink, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="投稿プレビュー"
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.modalImageBtn}
        onClick={(e) => {
          e.stopPropagation();
          openOnInstagram();
        }}
        aria-label="Instagram で開く"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tile.mediaUrl} alt="" className={styles.modalImage} />
        <span className={styles.modalHint}>Click to open on Instagram</span>
      </button>
      <button
        type="button"
        className={styles.modalClose}
        onClick={onClose}
        aria-label="閉じる"
      >
        ×
      </button>
    </div>
  );
}
