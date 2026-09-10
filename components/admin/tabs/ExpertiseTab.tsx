import type { SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput, TextArea, IconButton } from "../shared";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function ExpertiseTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  function addItem() {
    update((c) => ({
      ...c,
      expertise: [...c.expertise, { id: newId("exp"), title: "Nouveau domaine", description: "" }],
    }));
  }

  function updateItem(id: string, patch: Partial<SiteContent["expertise"][number]>) {
    update((c) => ({
      ...c,
      expertise: c.expertise.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function removeItem(id: string) {
    update((c) => ({ ...c, expertise: c.expertise.filter((item) => item.id !== id) }));
  }

  return (
    <Card title="Domaines d'expertise" description="Les compétences mises en avant sur la page d'accueil.">
      <div className="space-y-4">
        {content.expertise.map((item, i) => (
          <div key={item.id} className="rounded-xl border border-neutral-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Domaine {i + 1}</span>
              <IconButton tone="danger" label="Supprimer" onClick={() => removeItem(item.id)} />
            </div>
            <Field label="Titre">
              <TextInput value={item.title} onChange={(e) => updateItem(item.id, { title: e.target.value })} />
            </Field>
            <div className="mt-3">
              <Field label="Description">
                <TextArea rows={2} value={item.description} onChange={(e) => updateItem(item.id, { description: e.target.value })} />
              </Field>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="rounded-lg border border-dashed border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
      >
        + Ajouter un domaine
      </button>
    </Card>
  );
}
