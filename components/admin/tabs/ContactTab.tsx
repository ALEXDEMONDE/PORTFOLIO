import type { SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput } from "../shared";

export default function ContactTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  const contact = content.contact;

  function setContact(patch: Partial<SiteContent["contact"]>) {
    update((c) => ({ ...c, contact: { ...c.contact, ...patch } }));
  }

  function setPhone(index: number, value: string) {
    setContact({ phones: contact.phones.map((p, i) => (i === index ? value : p)) });
  }

  function addPhone() {
    setContact({ phones: [...contact.phones, ""] });
  }

  function removePhone(index: number) {
    setContact({ phones: contact.phones.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-6">
      <Card title="Localisation & coordonnées">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Adresse (ligne 1)">
            <TextInput value={contact.locationLine1} onChange={(e) => setContact({ locationLine1: e.target.value })} />
          </Field>
          <Field label="Adresse (ligne 2)">
            <TextInput value={contact.locationLine2} onChange={(e) => setContact({ locationLine2: e.target.value })} />
          </Field>
        </div>

        <Field label="E-mail">
          <TextInput type="email" value={contact.email} onChange={(e) => setContact({ email: e.target.value })} />
        </Field>

        <div>
          <p className="mb-1.5 text-sm font-medium text-neutral-600">Téléphones</p>
          <div className="space-y-2">
            {contact.phones.map((phone, i) => (
              <div key={i} className="flex gap-2">
                <TextInput value={phone} onChange={(e) => setPhone(i, e.target.value)} />
                <button
                  type="button"
                  onClick={() => removePhone(i)}
                  className="shrink-0 rounded-lg border border-neutral-300 px-2.5 text-sm text-neutral-500 hover:bg-neutral-50"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addPhone} className="mt-2 text-sm font-medium text-[var(--color-primary-dark,#D98F1B)]">
            + Ajouter un numéro
          </button>
        </div>
      </Card>

      <Card title="Réseaux professionnels">
        <Field label="LinkedIn">
          <TextInput
            value={contact.social.linkedin}
            onChange={(e) => setContact({ social: { ...contact.social, linkedin: e.target.value } })}
          />
        </Field>
        <Field label="Facebook">
          <TextInput
            value={contact.social.facebook}
            onChange={(e) => setContact({ social: { ...contact.social, facebook: e.target.value } })}
          />
        </Field>
        <Field label="TikTok">
          <TextInput
            value={contact.social.tiktok}
            onChange={(e) => setContact({ social: { ...contact.social, tiktok: e.target.value } })}
          />
        </Field>
      </Card>
    </div>
  );
}
