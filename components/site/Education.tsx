import type { EducationEntry } from "@/lib/types";

export default function Education({
  entries,
  languages: allLanguages,
}: {
  entries: EducationEntry[];
  languages: string[];
}) {
  const languages = allLanguages.map((l) => l.trim()).filter(Boolean);
  if (entries.length === 0 && languages.length === 0) return null;

  return (
    <section id="formation" className="bg-[var(--color-surface)] py-20">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Formation
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold text-[var(--color-primary-dark)]">{entry.period}</p>
              <h3 className="mt-1 text-lg font-bold text-[var(--color-text)]">{entry.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{entry.school}</p>
            </div>
          ))}
        </div>

        {languages.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-semibold text-neutral-600">Langues :</span>
            {languages.map((language) => (
              <span key={language} className="rounded-full bg-white px-3.5 py-1 text-sm text-neutral-700 ring-1 ring-black/5">
                {language}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
