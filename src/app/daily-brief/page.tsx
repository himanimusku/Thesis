"use client";

import { Newspaper, TrendingUp, FileText, Sparkles } from "lucide-react";
import { mockDailyBrief, mockPapers } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DailyBriefPage() {
  const brief = mockDailyBrief;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <Newspaper className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Daily Thesis Brief
            </h1>
            <p className="text-[var(--muted-foreground)]">
              {new Date(brief.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Summary */}
      <div className="rounded-xl border border-[var(--border)] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-400">Summary</span>
        </div>
        <p className="text-[var(--foreground)] leading-relaxed">
          <span className="font-semibold">{brief.totalPapers} papers</span> were
          published in your tracked fields during the last 24 hours.
        </p>
        <p className="mt-3 text-[var(--foreground)] leading-relaxed">
          The dominant themes were:
        </p>
        <ol className="mt-2 space-y-1.5 list-decimal list-inside">
          {brief.dominantThemes.map((theme, i) => (
            <li key={i} className="text-[var(--foreground)]">
              {theme}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[var(--foreground)] leading-relaxed">
          {brief.highlight}
        </p>
      </div>

      {/* Top Paper */}
      {brief.topPaper && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Most Significant Paper
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {brief.topPaper.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {brief.topPaper.authors.map((a) => a.name).join(", ")} &middot;{" "}
            {brief.topPaper.venue}
          </p>
          {brief.topPaper.summary?.oneSentence && (
            <p className="mt-3 text-sm text-[var(--foreground)] leading-relaxed">
              {brief.topPaper.summary.oneSentence}
            </p>
          )}
          <Link
            href={`/papers/${brief.topPaper.id}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Read Full Analysis →
          </Link>
        </div>
      )}

      {/* Themes Breakdown */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-400">
            Trending Themes
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {brief.dominantThemes.map((theme, i) => (
            <Badge key={i} variant="secondary" className="text-sm">
              {theme}
            </Badge>
          ))}
        </div>
      </div>

      {/* Recent Papers */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
          Other Notable Papers Today
        </h3>
        <div className="space-y-3">
          {mockPapers.slice(1, 4).map((paper) => (
            <Link
              key={paper.id}
              href={`/papers/${paper.id}`}
              className="block rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--accent)] transition-colors"
            >
              <h4 className="text-sm font-medium text-[var(--foreground)] line-clamp-1">
                {paper.title}
              </h4>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {paper.authors.map((a) => a.name).join(", ")} &middot;{" "}
                {paper.venue} &middot; {paper.citationCount} citations
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
