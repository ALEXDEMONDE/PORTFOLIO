import type { SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput, TextArea } from "../shared";
import FileUploader from "../FileUploader";

export default function ProfileTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  return (
    <div className="space-y-6">
      <Card title="Identité du site" description="Le nom et le logo affichés dans l'en-tête, et votre CV téléchargeable.">
        <Field label="Nom du site / de la marque">
          <TextInput
            value={content.site.siteName}
            onChange={(e) => update((c) => ({ ...c, site: { ...c.site, siteName: e.target.value } }))}
          />
        </Field>

        <FileUploader
          label="Logo"
          kind="image"
          url={content.site.logoUrl}
          onUploaded={(url) => update((c) => ({ ...c, site: { ...c.site, logoUrl: url } }))}
        />

        <FileUploader
          label="CV (PDF)"
          kind="document"
          url={content.site.cvUrl}
          onUploaded={(url) => update((c) => ({ ...c, site: { ...c.site, cvUrl: url } }))}
        />
      </Card>

      <Card title="Section d'accueil (Hero)" description="Votre photo de profil et le texte de présentation principal.">
        <FileUploader
          label="Photo de profil"
          kind="image"
          url={content.hero.photoUrl}
          onUploaded={(url) => update((c) => ({ ...c, hero: { ...c.hero, photoUrl: url } }))}
        />

        <Field label="Nom court (initiale du badge)">
          <TextInput
            value={content.hero.greeting}
            onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, greeting: e.target.value } }))}
          />
        </Field>

        <Field label="Nom complet">
          <TextInput
            value={content.hero.fullName}
            onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, fullName: e.target.value } }))}
          />
        </Field>

        <Field label="Accroche (titre court)">
          <TextArea
            rows={2}
            value={content.hero.tagline}
            onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, tagline: e.target.value } }))}
          />
        </Field>

        <Field label="Description">
          <TextArea
            rows={3}
            value={content.hero.description}
            onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, description: e.target.value } }))}
          />
        </Field>

        <Field label="Texte du bouton principal">
          <TextInput
            value={content.hero.ctaLabel}
            onChange={(e) => update((c) => ({ ...c, hero: { ...c.hero, ctaLabel: e.target.value } }))}
          />
        </Field>
      </Card>
    </div>
  );
}
