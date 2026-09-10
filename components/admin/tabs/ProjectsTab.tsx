import type { MediaItem, Project, SiteContent } from "@/lib/types";
import type { ContentUpdater } from "../AdminDashboard";
import { Card, Field, TextInput, TextArea, IconButton } from "../shared";
import FileUploader from "../FileUploader";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function ProjectsTab({ content, update }: { content: SiteContent; update: ContentUpdater }) {
  function addProject() {
    const project: Project = {
      id: newId("proj"),
      name: "Nouveau projet",
      subtitle: "",
      challenge: "",
      solution: "",
      gallery: [],
    };
    update((c) => ({ ...c, projects: [...c.projects, project] }));
  }

  function updateProject(id: string, patch: Partial<Project>) {
    update((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function removeProject(id: string) {
    update((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }));
  }

  function addGalleryItem(projectId: string, url: string, type: MediaItem["type"]) {
    update((c) => ({
      ...c,
      projects: c.projects.map((p) =>
        p.id === projectId ? { ...p, gallery: [...p.gallery, { id: newId("media"), url, type }] } : p
      ),
    }));
  }

  function removeGalleryItem(projectId: string, mediaId: string) {
    update((c) => ({
      ...c,
      projects: c.projects.map((p) =>
        p.id === projectId ? { ...p, gallery: p.gallery.filter((m) => m.id !== mediaId) } : p
      ),
    }));
  }

  return (
    <div className="space-y-6">
      {content.projects.map((project, i) => (
        <Card key={project.id} title={`Projet ${i + 1}`}>
          <div className="flex justify-end">
            <IconButton tone="danger" label="Supprimer le projet" onClick={() => removeProject(project.id)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom du projet">
              <TextInput value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} />
            </Field>
            <Field label="Sous-titre">
              <TextInput value={project.subtitle} onChange={(e) => updateProject(project.id, { subtitle: e.target.value })} />
            </Field>
          </div>

          <Field label="Défi">
            <TextArea rows={2} value={project.challenge} onChange={(e) => updateProject(project.id, { challenge: e.target.value })} />
          </Field>

          <Field label="Solution">
            <TextArea rows={2} value={project.solution} onChange={(e) => updateProject(project.id, { solution: e.target.value })} />
          </Field>

          <div>
            <p className="mb-2 text-sm font-medium text-neutral-600">Galerie du projet</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.gallery.map((item) => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-black/5">
                  {item.type === "video" ? (
                     
                    <video src={item.url} className="size-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt="" className="size-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(project.id, item.id)}
                    className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-4">
              <FileUploader compact kind="image" label="Ajouter une image" url="" onUploaded={(url) => addGalleryItem(project.id, url, "image")} />
              <FileUploader compact kind="video" label="Ajouter une vidéo" url="" onUploaded={(url) => addGalleryItem(project.id, url, "video")} />
            </div>
          </div>
        </Card>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="rounded-lg border border-dashed border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
      >
        + Ajouter un projet
      </button>
    </div>
  );
}
