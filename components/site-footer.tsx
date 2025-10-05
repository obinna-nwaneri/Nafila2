export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 py-8">
      <div className="container mx-auto flex flex-col gap-4 px-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Nafila Shop. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="hover:text-primary-300">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-primary-300">
            Terms of Service
          </a>
          <a href="mailto:hello@nafila.shop" className="hover:text-primary-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
