"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, TextInput } from "../shared";
import FileUploader from "../FileUploader";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function GalleryTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  const [newTag, setNewTag] = useState("");

  function addMedia(url: string, type: "image" | "video") {
    update((c) => ({
      ...c,
      media: [...c.media, { id: newId("media"), url, type, tag: newTag.trim() || "Général" }],
    }));
  }

  function updateTag(id: string, tag: string) {
    update((c) => ({ ...c, media: c.media.map((m) => (m.id === id ? { ...m, tag } : m)) }));
  }

  function removeMedia(id: string) {
    update((c) => ({ ...c, media: c.media.filter((m) => m.id !== id) }));
  }

  return (
    <Card
      title="Galerie de médias"
      description="Ajoutez des photos ou vidéos avec une étiquette (nom du projet ou catégorie) pour la section Galerie d'images."
    >
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-dashed border-neutral-300 p-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-600">Étiquette</label>
          <TextInput value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Ex: OROCOM" className="w-48" />
        </div>
        <FileUploader compact kind="image" label="Ajouter une image" url="" onUploaded={(url) => addMedia(url, "image")} />
        <FileUploader compact kind="video" label="Ajouter une vidéo" url="" onUploaded={(url) => addMedia(url, "video")} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {content.media.map((item) => (
          <div key={item.id} className="rounded-xl border border-neutral-200 p-2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              {item.type === "video" ? (
                 
                <video src={item.url} className="size-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.tag} className="size-full object-cover" />
              )}
            </div>
            <input
              value={item.tag}
              onChange={(e) => updateTag(item.id, e.target.value)}
              className="mt-2 w-full rounded-md border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-[var(--color-primary,#F5A623)]"
            />
            <button
              type="button"
              onClick={() => removeMedia(item.id)}
              className="mt-1.5 w-full rounded-md border border-red-200 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
