"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Star } from "lucide-react";
import { AuthorCard } from "@/components/authors/author-card";
import type { Author } from "@/types";

const FOLLOWED_AUTHORS = [
  { name: "Yann LeCun", id: "A5001226970" },
  { name: "Geoffrey Hinton", id: "A5108093963" },
  { name: "Fei-Fei Li", id: "A5100450462" },
  { name: "Demis Hassabis", id: "A5005349213" },
  { name: "Ilya Sutskever", id: "A5006446297" },
];

export default function AuthorsPage() {
  const [query, setQuery] = useState("");
  const [followedAuthors, setFollowedAuthors] = useState<Author[]>([]);
  const [trendingAuthors, setTrendingAuthors] = useState<Author[]>([]);
  const [searchResults, setSearchResults] = useState<Author[] | null>(null);
  const [loadingFollowed, setLoadingFollowed] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    fetchFollowedAuthors();
    fetchTrendingAuthors();
  }, []);

  async function fetchFollowedAuthors() {
    setLoadingFollowed(true);
    try {
      const results = await Promise.all(
        FOLLOWED_AUTHORS.map(async (a) => {
          const res = await fetch(`/api/authors?q=${encodeURIComponent(a.name)}&perPage=1`);
          const data = await res.json();
          return data.authors?.[0] ?? null;
        })
      );
      setFollowedAuthors(results.filter(Boolean));
    } catch {
      setFollowedAuthors([]);
    } finally {
      setLoadingFollowed(false);
    }
  }

  async function fetchTrendingAuthors() {
    setLoadingTrending(true);
    try {
      const res = await fetch("/api/authors?sort=citations&perPage=12");
      const data = await res.json();
      const followedIds = new Set(FOLLOWED_AUTHORS.map((a) => a.id));
      setTrendingAuthors(
        (data.authors ?? []).filter((a: Author) => !followedIds.has(a.id))
      );
    } catch {
      setTrendingAuthors([]);
    } finally {
      setLoadingTrending(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setLoadingSearch(true);
    try {
      const res = await fetch(`/api/authors?q=${encodeURIComponent(query)}&perPage=12`);
      const data = await res.json();
      setSearchResults(data.authors ?? []);
    } catch {
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setSearchResults(null);
  }

  return (
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Researchers
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Follow researchers and track their work
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Search researchers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
        />
      </form>

      {/* Search Results */}
      {loadingSearch && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" />
          <span className="ml-2 text-sm text-[var(--muted-foreground)]">Searching...</span>
        </div>
      )}

      {searchResults !== null && !loadingSearch && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Search Results
            </h2>
            <button
              onClick={clearSearch}
              className="text-xs text-[var(--primary)] hover:underline"
            >
              Clear search
            </button>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No researchers found for &ldquo;{query}&rdquo;
            </p>
          )}
        </section>
      )}

      {/* Normal view (no search) */}
      {searchResults === null && !loadingSearch && (
        <>
          {/* Followed Authors */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Authors You Follow
              </h2>
            </div>
            {loadingFollowed ? (
              <div className="flex items-center py-8">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
                <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {followedAuthors.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            )}
          </section>

          {/* Trending Authors */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
              Trending Researchers
            </h2>
            {loadingTrending ? (
              <div className="flex items-center py-8">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
                <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trendingAuthors.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
