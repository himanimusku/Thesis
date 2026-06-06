"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Beaker,
  House,
  Layers,
  Users,
  FileText,
  TrendingUp,
  BookOpen,
  Newspaper,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/topics", label: "Topics", icon: Layers },
  { href: "/authors", label: "Authors", icon: Users },
  { href: "/papers", label: "Papers", icon: FileText },
  { href: "/trends", label: "Trends", icon: TrendingUp },
  { href: "/reviews", label: "Reviews", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white shadow-sm text-[var(--foreground)] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] transition-transform duration-300",
          "w-[240px]",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-3 px-6 border-b border-[var(--sidebar-border)]">
          <Beaker className="h-6 w-6 text-[var(--primary)] shrink-0" />
          <span className="text-lg font-semibold text-[var(--foreground)] tracking-tight">
            Thesis
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-[var(--sidebar-text-muted)] hover:text-[var(--foreground)] lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
                    : "text-[var(--sidebar-text)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[var(--sidebar-border)]">
          <Link
            href="/daily-brief"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/daily-brief"
                ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]"
                : "text-[var(--sidebar-text)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            )}
          >
            <Newspaper className="h-5 w-5 shrink-0" />
            <span>Daily Brief</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
