"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/types";
import { IconLocation, IconPhone, IconMail, IconLinkedin, IconFacebook, IconTiktok } from "./icons";

export default function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || "Contact depuis le portfolio");
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-[var(--color-surface)] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Contactez-moi
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-xl font-bold text-[var(--color-text)]">Envoyez un message</h3>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-600">Nom</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Votre nom complet"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-600">E-mail</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-600">Objet</label>
                <input
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="Objet de votre message"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-600">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Votre message..."
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[var(--color-primary)] px-6 py-3 font-semibold text-black transition hover:bg-[var(--color-primary-dark)]"
              >
                Envoyer le message
              </button>
              {sent ? <p className="text-sm text-neutral-500">Votre client mail va s&apos;ouvrir pour finaliser l&apos;envoi.</p> : null}
            </form>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-xl font-bold text-[var(--color-text)]">Informations de contact</h3>

            <div className="mt-6 space-y-6 text-sm">
              <div className="flex gap-3">
                <IconLocation className="mt-0.5 size-5 shrink-0 text-[var(--color-primary-dark)]" />
                <div>
                  <p className="font-semibold text-neutral-700">Localisation</p>
                  <p className="text-neutral-500">{contact.locationLine1}</p>
                  <p className="text-neutral-500">{contact.locationLine2}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <IconPhone className="mt-0.5 size-5 shrink-0 text-[var(--color-primary-dark)]" />
                <div>
                  <p className="font-semibold text-neutral-700">Téléphones</p>
                  {contact.phones.map((phone) => (
                    <p key={phone} className="text-neutral-500">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <IconMail className="mt-0.5 size-5 shrink-0 text-[var(--color-primary-dark)]" />
                <div>
                  <p className="font-semibold text-neutral-700">Courriel</p>
                  <a href={`mailto:${contact.email}`} className="text-neutral-500 hover:text-[var(--color-primary-dark)]">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-neutral-700">Réseaux Professionnels</p>
              <div className="flex gap-3">
                {contact.social.linkedin ? (
                  <a
                    href={contact.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-neutral-600 hover:bg-[var(--color-primary)] hover:text-black"
                  >
                    <IconLinkedin />
                  </a>
                ) : null}
                {contact.social.facebook ? (
                  <a
                    href={contact.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-neutral-600 hover:bg-[var(--color-primary)] hover:text-black"
                  >
                    <IconFacebook />
                  </a>
                ) : null}
                {contact.social.tiktok ? (
                  <a
                    href={contact.social.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-neutral-600 hover:bg-[var(--color-primary)] hover:text-black"
                  >
                    <IconTiktok />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
