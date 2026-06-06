"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { TopicCard } from "@/components/topics/topic-card";
import type { Topic } from "@/types";

export default function TopicsPage() {
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics("");
  }, []);

  async function fetchTopics(q: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      params.set("perPage", "20");
      const res = await fetch(`/api/topics?${params}`);
      const data = await res.json();
      setTopics(data.topics ?? []);
    } catch {
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchTopics(query);
  }

  return (
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Research Topics
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Explore research areas and track scientific progress
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Search topics (e.g. machine learning, neuroscience)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
        />
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" />
          <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading topics...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>

          {topics.length === 0 && (
            <p className="mt-12 text-center text-[var(--muted-foreground)]">
              No topics found. Try a different search term.
            </p>
          )}
        </>
      )}
    </div>
  );
}
