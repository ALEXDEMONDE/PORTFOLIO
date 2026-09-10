import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

const REQUIRED_KEYS: (keyof SiteContent)[] = [
  "theme",
  "site",
  "hero",
  "expertise",
  "projects",
  "media",
  "experience",
  "contact",
];

function isValidContent(body: unknown): body is SiteContent {
  if (!body || typeof body !== "object") return false;
  return REQUIRED_KEYS.every((key) => key in (body as Record<string, unknown>));
}

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!isValidContent(body)) {
    return NextResponse.json({ error: "Contenu invalide." }, { status: 400 });
  }

  try {
    await saveContent(body);
  } catch {
    return NextResponse.json(
      {
        error:
          "Impossible d'enregistrer sur le serveur. Sur Vercel, configurez le stockage Vercel Blob (variable BLOB_READ_WRITE_TOKEN).",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
