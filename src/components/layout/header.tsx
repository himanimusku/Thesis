"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bell, LogIn, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/papers?q=${encodeURIComponent(query.trim())}`);
    }
  }

  async function handleSignOut() {
    await signOut();
    setShowMenu(false);
    router.push("/signin");
  }

  const initials = profile?.displayName
    ? profile.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--border)] bg-white/80 backdrop-blur-md px-6">
      <div className="w-10 lg:hidden" />

      <form onSubmit={handleSearch} className="flex flex-1 items-center max-w-xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, authors, topics..."
            className={cn(
              "w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] py-2 pl-10 pr-4 text-sm text-[var(--foreground)]",
              "placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20",
              "transition-colors"
            )}
          />
        </div>
      </form>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)]">
          <span>{today}</span>
        </div>

        {user ? (
          <>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--primary)]" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="h-8 w-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-xs font-medium text-white hover:opacity-90 transition-opacity"
              >
                {initials}
              </button>

              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-10 z-50 w-48 rounded-lg border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-lg">
                    <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">
                        {profile?.displayName ?? "User"}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/onboarding"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      Edit Interests
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/signin"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-medium text-white hover:bg-[var(--primary)]/90 transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
