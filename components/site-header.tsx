"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/investors", label: "Investors" },
  { href: "/community", label: "Community" }
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Nafila Shop
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "rounded-md px-3 py-2 transition",
                pathname === route.href
                  ? "bg-primary-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
