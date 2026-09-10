import type { ExperienceEntry } from "@/lib/types";

export default function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Expérience et Parcours
        </h2>

        <div className="relative mt-14 space-y-10 border-l-2 border-[var(--color-primary)]/40 pl-8">
          {entries.map((entry) => (
            <div key={entry.id} className="relative">
              <span className="absolute -left-[38px] top-1.5 size-3.5 rounded-full bg-[var(--color-primary)] ring-4 ring-white" />
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">{entry.period}</p>
              <h3 className="mt-1 text-xl font-bold text-[var(--color-text)]">{entry.role}</h3>
              <p className="text-neutral-500">{entry.company}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-600">
                {entry.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
