"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaperCard } from "@/components/papers/paper-card";
import type { Paper } from "@/types";

export default function PapersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-16"><Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" /></div>}>
      <PapersContent />
    </Suspense>
  );
}

function PapersContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "citations">(initialQuery ? "relevance" : "date");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [minCitations, setMinCitations] = useState("");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPapers();
  }, []);

  async function fetchPapers() {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (author) params.set("author", author);
    if (topic) params.set("topic", topic);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    if (minCitations) params.set("minCitations", minCitations);
    params.set("sort", sortBy);
    params.set("perPage", "20");

    try {
      const res = await fetch(`/api/papers?${params}`);
      const data = await res.json();
      setPapers(data.papers ?? []);
      setTotal(data.meta?.total ?? 0);
    } catch {
      setPapers([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchPapers();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Papers
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Search across millions of research papers via OpenAlex
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              placeholder="Search papers by title, keyword, or abstract..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {filtersOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {filtersOpen && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Date From</label>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Date To</label>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Author</label>
                <Input placeholder="e.g. Yann LeCun" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Topic</label>
                <Input placeholder="e.g. Reinforcement Learning" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Min Citations</label>
                <Input type="number" placeholder="0" value={minCitations} onChange={(e) => setMinCitations(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
              <span className="text-xs font-medium text-[var(--muted-foreground)]">Sort by:</span>
              {(["relevance", "date", "citations"] as const).map((s) => (
                <Badge
                  key={s}
                  variant={sortBy === s ? "default" : "outline"}
                  className="cursor-pointer capitalize"
                  onClick={() => setSortBy(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="text-sm text-[var(--muted-foreground)]">
        {loading ? "Searching..." : `${formatNumber(total)} results`}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" />
          <span className="ml-2 text-sm text-[var(--muted-foreground)]">Fetching from OpenAlex...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
          {papers.length === 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
              <p className="text-[var(--muted-foreground)]">No papers found. Try a different search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
