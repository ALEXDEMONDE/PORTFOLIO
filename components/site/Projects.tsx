"use client";

import { useState } from "react";
import type { MediaItem, Project } from "@/lib/types";
import { IconPlay } from "./icons";

export default function Projects({
  projects,
  onOpenLightbox,
}: {
  projects: Project[];
  onOpenLightbox: (items: MediaItem[], index: number) => void;
}) {
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  if (!active) return null;

  return (
    <section id="projets" className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Projets Réalisés
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                p.id === active.id
                  ? "bg-[var(--color-primary)] text-black"
                  : "bg-[var(--color-surface)] text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-[var(--color-surface)] p-6 sm:p-10">
          <h3 className="text-2xl font-bold text-[var(--color-text)]">{active.name}</h3>
          <p className="mt-1 font-medium text-[var(--color-primary-dark)]">{active.subtitle}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Défi</h4>
              <p className="mt-2 text-neutral-700">{active.challenge}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-500">Solution</h4>
              <p className="mt-2 text-neutral-700">{active.solution}</p>
            </div>
          </div>

          {active.gallery.length > 0 ? (
            <>
              <h4 className="mt-8 text-sm font-bold uppercase tracking-wide text-neutral-500">Galerie d&apos;images</h4>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {active.gallery.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenLightbox(active.gallery, i)}
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
                        alt={`${active.name} - image ${i + 1}`}
                        className="size-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
