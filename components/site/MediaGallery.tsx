"use client";

import { useMemo, useState } from "react";
import type { MediaGalleryItem, MediaItem } from "@/lib/types";
import { IconPlay } from "./icons";

export default function MediaGallery({
  media,
  onOpenLightbox,
}: {
  media: MediaGalleryItem[];
  onOpenLightbox: (items: MediaItem[], index: number) => void;
}) {
  const tags = useMemo(() => ["Tous", ...Array.from(new Set(media.map((m) => m.tag)))], [media]);
  const [activeTag, setActiveTag] = useState("Tous");

  const filtered = activeTag === "Tous" ? media : media.filter((m) => m.tag === activeTag);

  if (media.length === 0) return null;

  return (
    <section id="galerie" className="bg-[var(--color-surface)] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Galerie d&apos;images
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tag === activeTag ? "bg-[var(--color-primary)] text-black" : "bg-white text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenLightbox(filtered, i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-200"
            >
              {item.type === "video" ? (
                <>
                  { }
                  <video src={`${item.url}#t=0.1`} preload="metadata" className="size-full object-cover" muted playsInline />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                    <IconPlay />
                  </span>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.tag}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                />
              )}
              <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
