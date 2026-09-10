import Image from "next/image";
import type { SiteContent } from "@/lib/types";

export default function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section id="accueil" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-[var(--color-primary)] text-xl font-bold text-black">
          {hero.greeting.charAt(0)}
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl">
          {hero.fullName}
        </h1>
        <p className="mt-5 text-lg font-medium text-neutral-700">{hero.tagline}</p>
        <p className="mt-4 max-w-xl text-neutral-500">{hero.description}</p>
        <a
          href="#projets"
          className="mt-8 inline-block rounded-full bg-[var(--color-primary)] px-7 py-3.5 font-semibold text-black transition hover:bg-[var(--color-primary-dark)]"
        >
          {hero.ctaLabel}
        </a>
      </div>

      <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-2xl bg-neutral-900 shadow-xl md:justify-self-end">
        {hero.photoUrl ? (
          <Image src={hero.photoUrl} alt={hero.fullName} fill sizes="400px" className="object-cover" priority />
        ) : null}
      </div>
    </section>
  );
}
