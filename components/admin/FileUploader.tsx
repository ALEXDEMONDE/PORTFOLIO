"use client";

import { useRef, useState } from "react";

export type UploadKind = "image" | "video" | "document";

async function uploadFile(file: File): Promise<{ url: string; type: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Échec de l'envoi du fichier.");
  }
  return res.json();
}

export default function FileUploader({
  url,
  kind,
  label,
  onUploaded,
  compact = false,
}: {
  url: string;
  kind: UploadKind;
  label?: string;
  onUploaded: (url: string) => void;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const accept = kind === "image" ? "image/*" : kind === "video" ? "video/*" : "application/pdf";

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const result = await uploadFile(file);
      onUploaded(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={compact ? "" : "space-y-2"}>
      {label ? <p className="text-sm font-medium text-neutral-600">{label}</p> : null}

      {!compact && kind === "image" && url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={label ?? "aperçu"} className="h-28 w-28 rounded-lg object-cover ring-1 ring-black/10" />
      ) : null}
      {!compact && kind === "video" && url ? (
         
        <video src={url} controls className="h-28 rounded-lg ring-1 ring-black/10" />
      ) : null}
      {!compact && kind === "document" && url ? (
        <a href={url} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-primary-dark,#D98F1B)] underline">
          Voir le document actuel
        </a>
      ) : null}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
        >
          {busy ? "Envoi..." : url ? "Changer le fichier" : "Choisir un fichier"}
        </button>
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
