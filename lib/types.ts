export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
};

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  challenge: string;
  solution: string;
  gallery: MediaItem[];
};

export type MediaGalleryItem = MediaItem & { tag: string };

export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  company: string;
  bullets: string[];
};

export type EducationEntry = {
  id: string;
  period: string;
  title: string;
  school: string;
};

export type SiteContent = {
  theme: {
    primary: string;
    primaryDark: string;
    dark: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  site: {
    logoUrl: string;
    siteName: string;
    cvUrl: string;
  };
  hero: {
    photoUrl: string;
    greeting: string;
    fullName: string;
    tagline: string;
    description: string;
    ctaLabel: string;
  };
  expertise: { id: string; title: string; description: string }[];
  projects: Project[];
  media: MediaGalleryItem[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  tools: string[];
  languages: string[];
  contact: {
    locationLine1: string;
    locationLine2: string;
    phones: string[];
    email: string;
    social: {
      linkedin: string;
      facebook: string;
      tiktok: string;
    };
  };
};
