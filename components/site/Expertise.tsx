import type { SiteContent } from "@/lib/types";

export default function Expertise({ items }: { items: SiteContent["expertise"] }) {
  return (
    <section id="expertise" className="bg-[var(--color-surface)] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Domaines d&apos;Expertise
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
              <div className="mb-4 size-11 rounded-xl bg-[var(--color-primary)]/15" />
              <h3 className="text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
