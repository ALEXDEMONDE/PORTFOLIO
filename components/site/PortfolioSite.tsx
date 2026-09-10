"use client";

import { useState } from "react";
import type { MediaItem, SiteContent } from "@/lib/types";
import Header from "./Header";
import Hero from "./Hero";
import Expertise from "./Expertise";
import Projects from "./Projects";
import MediaGallery from "./MediaGallery";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

export default function PortfolioSite({ content }: { content: SiteContent }) {
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

  return (
    <>
      <Header siteName={content.site.siteName} logoUrl={content.site.logoUrl} cvUrl={content.site.cvUrl} />
      <main className="flex-1">
        <Hero hero={content.hero} />
        <Expertise items={content.expertise} />
        <Projects projects={content.projects} onOpenLightbox={(items, index) => setLightbox({ items, index })} />
        <MediaGallery media={content.media} onOpenLightbox={(items, index) => setLightbox({ items, index })} />
        <Experience entries={content.experience} />
        <Contact contact={content.contact} />
      </main>
      <Footer siteName={content.site.siteName} />

      {lightbox ? (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndexChange={(index) => setLightbox((l) => (l ? { ...l, index } : l))}
        />
      ) : null}
    </>
  );
}
