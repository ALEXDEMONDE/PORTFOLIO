import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: `Portfolio Professionnel ${content.site.siteName}`,
    description: content.hero.tagline,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getContent();
  const t = content.theme;

  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={
        {
          "--color-primary": t.primary,
          "--color-primary-dark": t.primaryDark,
          "--color-dark": t.dark,
          "--color-bg": t.background,
          "--color-surface": t.surface,
          "--color-text": t.text,
          "--color-muted": t.muted,
        } as React.CSSProperties
      }
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
      >
        {children}
      </body>
    </html>
  );
}
