export default function Footer({ siteName }: { siteName: string }) {
  return (
    <footer className="border-t border-black/5 py-8">
      <p className="text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} {siteName}. Tous droits réservés.
      </p>
    </footer>
  );
}
