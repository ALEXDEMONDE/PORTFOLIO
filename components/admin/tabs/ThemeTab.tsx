import type { SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field } from "../shared";

const COLOR_FIELDS: { key: keyof SiteContent["theme"]; label: string; hint: string }[] = [
  { key: "primary", label: "Couleur principale", hint: "Boutons, accents, badges" },
  { key: "primaryDark", label: "Couleur principale (survol)", hint: "État au survol des boutons" },
  { key: "dark", label: "Couleur sombre", hint: "Textes forts, fonds sombres" },
  { key: "background", label: "Fond du site", hint: "Arrière-plan général" },
  { key: "surface", label: "Fond des sections", hint: "Sections alternées, cartes" },
  { key: "text", label: "Texte principal", hint: "Titres et corps de texte" },
  { key: "muted", label: "Texte atténué", hint: "Sous-titres, texte secondaire" },
];

export default function ThemeTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  const theme = content.theme;

  function setColor(key: keyof SiteContent["theme"], value: string) {
    update((c) => ({ ...c, theme: { ...c.theme, [key]: value } }));
  }

  return (
    <Card title="Couleurs du portfolio" description="Personnalisez la palette utilisée sur tout le site. Les changements sont visibles immédiatement après enregistrement.">
      <div className="grid gap-5 sm:grid-cols-2">
        {COLOR_FIELDS.map((f) => (
          <Field key={f.key} label={f.label}>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme[f.key]}
                onChange={(e) => setColor(f.key, e.target.value)}
                className="size-10 shrink-0 cursor-pointer rounded-lg border border-neutral-200"
              />
              <input
                type="text"
                value={theme[f.key]}
                onChange={(e) => setColor(f.key, e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[var(--color-primary,#F5A623)]"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-400">{f.hint}</p>
          </Field>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-neutral-300 p-5" style={{ background: theme.surface }}>
        <p className="text-sm font-medium" style={{ color: theme.text }}>
          Aperçu
        </p>
        <button
          type="button"
          className="mt-3 rounded-full px-5 py-2 text-sm font-semibold text-black"
          style={{ background: theme.primary }}
        >
          Bouton d&apos;action
        </button>
      </div>
    </Card>
  );
}
