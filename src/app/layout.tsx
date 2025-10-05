import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Nafila Shop Platform",
  description: "A venture collaboration platform for entrepreneurs, investors, and the Nafila community.",
  metadataBase: new URL("https://nafila.local"),
  openGraph: {
    title: "Nafila Shop Platform",
    description: "Launch, discover, and invest in high-potential ideas.",
    url: "https://nafila.local",
    siteName: "Nafila Shop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
        width: 1200,
        height: 630,
        alt: "Nafila Shop"
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand/10 p-2 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path d="M12 2a5 5 0 0 0-5 5v3H6a4 4 0 0 0-4 4v4.25A2.75 2.75 0 0 0 4.75 21h14.5A2.75 2.75 0 0 0 22 18.25V14a4 4 0 0 0-4-4h-1V7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3v3H9V7a3 3 0 0 1 3-3Zm-6 8h12a2 2 0 0 1 2 2v4.25a.75.75 0 0 1-.75.75h-14.5a.75.75 0 0 1-.75-.75V14a2 2 0 0 1 2-2Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">Nafila Shop</p>
                  <p className="text-xs text-slate-500">Connecting ideas with capital</p>
                </div>
              </div>
              <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
                <Link href="/" className="hover:text-brand">
                  Home
                </Link>
                <Link href="/entrepreneur" className="hover:text-brand">
                  Entrepreneur
                </Link>
                <Link href="/investor" className="hover:text-brand">
                  Investor
                </Link>
                <Link href="/admin" className="hover:text-brand">
                  Admin
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-full border border-brand/30 px-4 py-2 text-sm text-brand hover:border-brand hover:bg-brand/10"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-dark sm:inline-flex"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </header>
          <main className="pt-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
