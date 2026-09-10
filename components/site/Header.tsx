"use client";

import { useState } from "react";
import Image from "next/image";
import { IconMenu, IconClose } from "./icons";

const LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projets", label: "Projets" },
  { href: "#experience", label: "Expérience" },
  { href: "#contact", label: "Contact" },
];

export default function Header({
  siteName,
  logoUrl,
  cvUrl,
}: {
  siteName: string;
  logoUrl: string;
  cvUrl: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#accueil" className="flex items-center gap-2 font-semibold text-[var(--color-text)]">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`Logo ${siteName}`}
              width={32}
              height={32}
              className="size-8 rounded-md object-cover"
            />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-md bg-[var(--color-primary)] text-sm font-bold text-black">
              {siteName.charAt(0)}
            </span>
          )}
          <span>{siteName}</span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-700 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-[var(--color-primary-dark)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          {cvUrl ? (
            <a
              href={cvUrl}
              download
              className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--color-primary-dark)]"
            >
              Télécharger CV
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
          className="text-neutral-700 md:hidden"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-5 py-3 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {link.label}
            </a>
          ))}
          {cvUrl ? (
            <a
              href={cvUrl}
              download
              className="mt-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-center text-sm font-semibold text-black"
            >
              Télécharger CV
            </a>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
