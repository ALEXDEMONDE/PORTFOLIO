import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");
const BLOB_PATHNAME = "data/content.json";

function isBlobEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function normalize(raw: Partial<SiteContent>): SiteContent {
  return { education: [], tools: [], languages: [], ...raw } as SiteContent;
}

async function readSeedContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return normalize(JSON.parse(raw));
}

export async function getContent(): Promise<SiteContent> {
  if (isBlobEnabled()) {
    const { head } = await import("@vercel/blob");
    try {
      const blob = await head(BLOB_PATHNAME);
      const res = await fetch(blob.url, { cache: "no-store" });
      return normalize(await res.json());
    } catch {
      // Pas encore initialisé sur Vercel Blob : on part du contenu de départ
      // et on l'enregistre pour les prochaines lectures/écritures.
      const seed = await readSeedContent();
      await saveContent(seed).catch(() => {});
      return seed;
    }
  }

  return readSeedContent();
}

export async function saveContent(content: SiteContent): Promise<void> {
  const json = JSON.stringify(content, null, 2);

  if (isBlobEnabled()) {
    const { put } = await import("@vercel/blob");
    await put(BLOB_PATHNAME, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  await fs.writeFile(CONTENT_PATH, json, "utf-8");
}
