"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/types";
import ProfileTab from "./tabs/ProfileTab";
import ThemeTab from "./tabs/ThemeTab";
import ExpertiseTab from "./tabs/ExpertiseTab";
import ProjectsTab from "./tabs/ProjectsTab";
import GalleryTab from "./tabs/GalleryTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ContactTab from "./tabs/ContactTab";

export type ContentUpdater = (updater: (content: SiteContent) => SiteContent) => void;

const TABS = [
  { id: "profil", label: "Profil & Marque" },
  { id: "couleurs", label: "Couleurs" },
  { id: "expertise", label: "Expertise" },
  { id: "projets", label: "Projets" },
  { id: "galerie", label: "Galerie" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("profil");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  const update: ContentUpdater = useCallback((updater) => {
    setContent((prev) => updater(prev));
    setDirty(true);
  }, []);

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ type: "error", message: data.error || "Échec de l'enregistrement." });
        return;
      }
      setDirty(false);
      setStatus({ type: "ok", message: "Modifications enregistrées." });
      router.refresh();
    } catch {
      setStatus({ type: "error", message: "Erreur réseau." });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h1 className="text-lg font-bold text-neutral-900">Administration du portfolio</h1>
            <p className="text-xs text-neutral-500">{dirty ? "Modifications non enregistrées" : "Tout est à jour"}</p>
          </div>
          <div className="flex items-center gap-3">
            {status ? (
              <span className={`text-sm ${status.type === "ok" ? "text-green-600" : "text-red-600"}`}>{status.message}</span>
            ) : null}
            <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Voir le site ↗
            </a>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !dirty}
              className="rounded-full bg-[var(--color-primary,#F5A623)] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[var(--color-primary-dark,#D98F1B)] disabled:opacity-50"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button type="button" onClick={handleLogout} className="text-sm font-medium text-neutral-500 hover:text-red-600">
              Déconnexion
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeTab === tab.id ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {activeTab === "profil" ? <ProfileTab content={content} update={update} /> : null}
        {activeTab === "couleurs" ? <ThemeTab content={content} update={update} /> : null}
        {activeTab === "expertise" ? <ExpertiseTab content={content} update={update} /> : null}
        {activeTab === "projets" ? <ProjectsTab content={content} update={update} /> : null}
        {activeTab === "galerie" ? <GalleryTab content={content} update={update} /> : null}
        {activeTab === "experience" ? <ExperienceTab content={content} update={update} /> : null}
        {activeTab === "contact" ? <ContactTab content={content} update={update} /> : null}
      </main>
    </div>
  );
}
