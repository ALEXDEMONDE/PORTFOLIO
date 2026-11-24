import type { EducationEntry, SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput, TextArea, IconButton } from "../shared";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function splitLines(value: string): string[] {
  return value.split("\n");
}

export default function EducationTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  function addEntry() {
    const entry: EducationEntry = { id: newId("edu"), period: "", title: "Nouvelle formation", school: "" };
    update((c) => ({ ...c, education: [...c.education, entry] }));
  }

  function updateEntry(id: string, patch: Partial<EducationEntry>) {
    update((c) => ({ ...c, education: c.education.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  }

  function removeEntry(id: string) {
    update((c) => ({ ...c, education: c.education.filter((e) => e.id !== id) }));
  }

  return (
    <div className="space-y-6">
      <Card title="Formation et certifications" description="Diplômes et certifications affichés dans la section Formation.">
        <div className="space-y-4">
          {content.education.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-3 flex justify-end">
                <IconButton tone="danger" label="Supprimer" onClick={() => removeEntry(entry.id)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Période">
                  <TextInput value={entry.period} onChange={(e) => updateEntry(entry.id, { period: e.target.value })} />
                </Field>
                <Field label="Diplôme / certification">
                  <TextInput value={entry.title} onChange={(e) => updateEntry(entry.id, { title: e.target.value })} />
                </Field>
                <Field label="Établissement">
                  <TextInput value={entry.school} onChange={(e) => updateEntry(entry.id, { school: e.target.value })} />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addEntry}
          className="rounded-lg border border-dashed border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
        >
          + Ajouter une formation
        </button>
      </Card>

      <Card title="Outils et langues">
        <Field label="Outils (un par ligne)">
          <TextArea
            rows={5}
            value={content.tools.join("\n")}
            onChange={(e) => update((c) => ({ ...c, tools: splitLines(e.target.value) }))}
          />
        </Field>
        <Field label="Langues (une par ligne)">
          <TextArea
            rows={3}
            value={content.languages.join("\n")}
            onChange={(e) => update((c) => ({ ...c, languages: splitLines(e.target.value) }))}
          />
        </Field>
      </Card>
    </div>
  );
}
