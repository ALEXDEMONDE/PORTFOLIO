import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
]);

function isBlobEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function sanitizeFileName(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "fichier"}${ext}`;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Type de fichier non supporté." }, { status: 415 });
  }

  const isVideo = file.type.startsWith("video/");
  const isDocument = file.type === "application/pdf";
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Fichier trop volumineux." }, { status: 413 });
  }

  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const fileName = `${unique}-${sanitizeFileName(file.name)}`;
  const responseType = isVideo ? "video" : isDocument ? "document" : "image";

  if (isBlobEnabled()) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`uploads/${fileName}`, file, {
        access: "public",
        contentType: file.type,
        addRandomSuffix: false,
      });
      return NextResponse.json({ url: blob.url, type: responseType });
    } catch {
      return NextResponse.json(
        { error: "Échec de l'envoi vers le stockage persistant (Vercel Blob)." },
        { status: 500 }
      );
    }
  }

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = path.join(UPLOAD_DIR, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
  } catch {
    return NextResponse.json(
      {
        error:
          "Impossible d'écrire le fichier sur le serveur. Sur Vercel, configurez le stockage Vercel Blob (variable BLOB_READ_WRITE_TOKEN).",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/uploads/${fileName}`, type: responseType });
}
