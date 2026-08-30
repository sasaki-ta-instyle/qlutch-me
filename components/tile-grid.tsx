"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type SyntheticEvent,
} from "react";
import type { IgTile } from "@/lib/instagram";
import { wsrvLoader } from "@/lib/image-loader";
import styles from "./tile-grid.module.css";

export function TileGrid({ tiles }: { tiles: IgTile[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  // モーダルを開いたトリガーボタン参照（閉じたときにフォーカスを戻す）
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (
    tile: IgTile,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const idx = tiles.findIndex((t) => t.id === tile.id);
    if (idx < 0) return;
    triggerRef.current = e.currentTarget;
    setSelectedIndex(idx);
  };

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + tiles.length) % tiles.length,
    );
  }, [tiles.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % tiles.length));
  }, [tiles.length]);

  const handleImgError = (id: string) => {
    setFailedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  /*
   * タイル hover 時にモーダル用 w=1080 の WebP を preload。
   * 一度発行した URL は同一 tile に対しては再要求しないよう Set で管理して
   * 無駄な HTTP を作らない。
   */
  const preloadedRef = useRef<Set<string>>(new Set());
  const preloadHiRes = (tile: IgTile) => {
    if (preloadedRef.current.has(tile.id)) return;
    preloadedRef.current.add(tile.id);
    const url = wsrvLoader({
      src: tile.mediaUrl,
      width: 1080,
      quality: 80,
    });
    const img = new window.Image();
    img.src = url;
  };

  // モーダル表示中の body スクロールロック (iOS Safari 対応: position: fixed 方式)
  useEffect(() => {
    if (selectedIndex === null) return;
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
  }, [selectedIndex]);

  const visibleTiles = tiles.filter((t) => !failedIds.has(t.id));
  const selectedTile =
    selectedIndex !== null ? tiles[selectedIndex] ?? null : null;

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
        {visibleTiles.map((tile, index) => (
          <li key={tile.id} className={styles.item}>
            <button
              type="button"
              className={styles.link}
              onClick={(e) => openModal(tile, e)}
              /*
               * pointerenter は mouse / pen / touch すべてカバー。
               * touch では tap 直前の focus と重なることもあるが実害なし。
               */
              onPointerEnter={() => preloadHiRes(tile)}
              onFocus={() => preloadHiRes(tile)}
              aria-label={`Instagram 投稿を開く（${tile.timestamp}）`}
            >
              <Image
                src={tile.mediaUrl}
                alt=""
                fill
                sizes="(max-width: 599px) 50vw, (max-width: 819px) 33vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1599px) 20vw, (max-width: 2559px) 16vw, 14vw"
                className={styles.image}
                /*
                 * wsrv.nl 経由で WebP + width 指定に resize して DL。
                 * unoptimized は外し、Next の srcset 生成に loader を回す。
                 */
                loader={wsrvLoader}
                /*
                 * 先頭 8 枚は最悪ケース (7 列レイアウト = 30" 4K) の 1 行分。
                 * preload リンクを出して初期表示を前倒し、それ以降は default lazy に任せる。
                 */
                priority={index < 8}
                onError={() => handleImgError(tile.id)}
              />
            </button>
          </li>
        ))}
      </ul>

      {selectedTile && (
        <Modal
          tile={selectedTile}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

function Modal({
  tile,
  onClose,
  onPrev,
  onNext,
}: {
  tile: IgTile;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hintRef = useRef<HTMLAnchorElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // タイル切り替え時に failed / loaded をリセット
  useEffect(() => {
    setFailed(false);
    setLoaded(false);
    /*
     * ブラウザキャッシュに既に載っている画像は onLoad が発火しないことがあるので、
     * mount 直後に img.complete をチェックして loaded を立てる。
     */
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [tile.id]);

  /*
   * 画像 load が完了してヒントリンクが DOM に現れたタイミングでフォーカスを移す。
   * loaded false のとき (= スピナー表示中) は hint がそもそも render されていないので
   * focus 対象が無い。onFocusOut / onKeyDown Tab の fallback は
   * optional chaining で null-safe になっているため、それらは触らない。
   */
  useEffect(() => {
    if (loaded) {
      hintRef.current?.focus();
    }
  }, [loaded]);

  const onFocusOut = (e: SyntheticEvent) => {
    const evt = e as unknown as { relatedTarget: Node | null };
    if (!evt.relatedTarget || !e.currentTarget.contains(evt.relatedTarget)) {
      requestAnimationFrame(() => hintRef.current?.focus());
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      hintRef.current?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
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

      {/* 左送り (Prev) — 画像の左サイド */}
      <button
        type="button"
        className={`${styles.modalNav} ${styles.modalNavPrev}`}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="前の投稿"
      >
        <svg
          className={styles.modalNavIcon}
          viewBox="0 0 24 24"
          aria-hidden
          focusable="false"
        >
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </button>

      {/*
       * 読み込み中スピナー。overlay に対して absolute center。
       * failed / loaded どちらでもない = 読み込み中に限り表示。
       */}
      {!failed && !loaded && <div className={styles.spinner} aria-hidden />}

      <div className={styles.modalContent}>
        {failed ? (
          <div className={styles.modalFallback}>
            <p>画像を読み込めませんでした。</p>
            <p>Instagram で直接開いてください。</p>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            ref={imgRef}
            /*
             * Instagram のオリジナルは 1080px 上限。w=1600 は wsrv の we で
             * 結局 1080 に丸められるだけなので、ここで w=1080 に揃える。
             * これでタイル grid が Retina 用に 1080 版を srcset に持っていたら
             * ブラウザキャッシュ命中し得る。q=80 に統一（tile grid loader と同じ）。
             */
            src={wsrvLoader({ src: tile.mediaUrl, width: 1080, quality: 80 })}
            alt=""
            className={styles.modalImage}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        {/*
         * ヒントリンクは画像 load 完了時にだけマウント。
         * スピナーと同時には出さない (UX: 何を click するか分からないうちに
         * "CLICK TO ..." が並ぶと視線を割く)。
         */}
        {loaded && !failed && (
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
        )}
      </div>

      {/* 右送り (Next) — 画像の右サイド */}
      <button
        type="button"
        className={`${styles.modalNav} ${styles.modalNavNext}`}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="次の投稿"
      >
        <svg
          className={styles.modalNavIcon}
          viewBox="0 0 24 24"
          aria-hidden
          focusable="false"
        >
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </button>
    </div>
  );
}
