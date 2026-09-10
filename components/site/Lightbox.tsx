"use client";

import { useEffect, useCallback } from "react";
import type { MediaItem } from "@/lib/types";
import { IconClose, IconChevron } from "./icons";

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const goPrev = useCallback(
    () => onIndexChange((index - 1 + items.length) % items.length),
    [index, items.length, onIndexChange]
  );
  const goNext = useCallback(() => onIndexChange((index + 1) % items.length), [index, items.length, onIndexChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  const current = items[index];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 text-white/80 hover:text-white"
      >
        <IconClose className="size-8" />
      </button>

      {items.length > 1 ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Précédent"
          className="absolute left-3 text-white/80 hover:text-white sm:left-6"
        >
          <IconChevron direction="left" className="size-9" />
        </button>
      ) : null}

      <div className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {current.type === "video" ? (
           
          <video src={current.url} controls autoPlay className="max-h-[85vh] max-w-full rounded-lg" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current.url} alt={current.caption ?? ""} className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        )}
        {current.caption ? <p className="mt-3 text-center text-sm text-white/70">{current.caption}</p> : null}
      </div>

      {items.length > 1 ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Suivant"
          className="absolute right-3 text-white/80 hover:text-white sm:right-6"
        >
          <IconChevron direction="right" className="size-9" />
        </button>
      ) : null}
    </div>
  );
}
