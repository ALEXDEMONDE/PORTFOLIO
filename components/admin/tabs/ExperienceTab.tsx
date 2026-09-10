import type { ExperienceEntry, SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput, IconButton } from "../shared";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function ExperienceTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  function addEntry() {
    const entry: ExperienceEntry = {
      id: newId("xp"),
      period: "",
      role: "Nouveau poste",
      company: "",
      bullets: [""],
    };
    update((c) => ({ ...c, experience: [entry, ...c.experience] }));
  }

  function updateEntry(id: string, patch: Partial<ExperienceEntry>) {
    update((c) => ({ ...c, experience: c.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  }

  function removeEntry(id: string) {
    update((c) => ({ ...c, experience: c.experience.filter((e) => e.id !== id) }));
  }

  function updateBullet(id: string, index: number, value: string) {
    update((c) => ({
      ...c,
      experience: c.experience.map((e) =>
        e.id === id ? { ...e, bullets: e.bullets.map((b, i) => (i === index ? value : b)) } : e
      ),
    }));
  }

  function addBullet(id: string) {
    update((c) => ({
      ...c,
      experience: c.experience.map((e) => (e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e)),
    }));
  }

  function removeBullet(id: string, index: number) {
    update((c) => ({
      ...c,
      experience: c.experience.map((e) => (e.id === id ? { ...e, bullets: e.bullets.filter((_, i) => i !== index) } : e)),
    }));
  }

  return (
    <Card title="Expérience et parcours" description="Vos postes précédents, du plus récent au plus ancien.">
      <div className="space-y-4">
        {content.experience.map((entry) => (
          <div key={entry.id} className="rounded-xl border border-neutral-200 p-4">
            <div className="mb-3 flex justify-end">
              <IconButton tone="danger" label="Supprimer" onClick={() => removeEntry(entry.id)} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Période">
                <TextInput
                  value={entry.period}
                  placeholder="Janvier 2026 – Mai 2026"
                  onChange={(e) => updateEntry(entry.id, { period: e.target.value })}
                />
              </Field>
              <Field label="Poste">
                <TextInput value={entry.role} onChange={(e) => updateEntry(entry.id, { role: e.target.value })} />
              </Field>
              <Field label="Entreprise">
                <TextInput value={entry.company} onChange={(e) => updateEntry(entry.id, { company: e.target.value })} />
              </Field>
            </div>

            <div className="mt-3">
              <p className="mb-1.5 text-sm font-medium text-neutral-600">Missions</p>
              <div className="space-y-2">
                {entry.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2">
                    <TextInput value={bullet} onChange={(e) => updateBullet(entry.id, i, e.target.value)} />
                    <button
                      type="button"
                      onClick={() => removeBullet(entry.id, i)}
                      className="shrink-0 rounded-lg border border-neutral-300 px-2.5 text-sm text-neutral-500 hover:bg-neutral-50"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addBullet(entry.id)}
                className="mt-2 text-sm font-medium text-[var(--color-primary-dark,#D98F1B)]"
              >
                + Ajouter une mission
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEntry}
        className="rounded-lg border border-dashed border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
      >
        + Ajouter une expérience
      </button>
    </Card>
  );
}
