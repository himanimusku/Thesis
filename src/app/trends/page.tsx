"use client";

import { useState } from "react";
import { mockTrends } from "@/lib/mock-data";
import type { TrendSignal } from "@/types";

const trendTypes = [
  { value: "all", label: "All" },
  { value: "research_explosion", label: "Research Explosion" },
  { value: "emerging_concept", label: "Emerging Concept" },
  { value: "novel_methodology", label: "Novel Methodology" },
  { value: "citation_acceleration", label: "Citation Acceleration" },
  { value: "interdisciplinary_convergence", label: "Interdisciplinary" },
];

export default function TrendsPage() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredTrends = selectedType === "all"
    ? mockTrends
    : mockTrends.filter((t) => t.trendType === selectedType);

  const sortedTrends = [...filteredTrends].sort(
    (a, b) => b.momentumScore - a.momentumScore
  );

  return (
    <div className="mx-auto max-w-4xl py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          Trends
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Research areas gaining momentum across the scientific literature
        </p>
      </header>

      <div className="flex items-center gap-1.5 flex-wrap mb-6 border-b border-[var(--border)] pb-4">
        {trendTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedType === type.value
                ? "bg-[var(--foreground)] text-white"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--muted-foreground)] mb-4">
        {sortedTrends.length} signal{sortedTrends.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-3">
        {sortedTrends.map((trend) => (
          <TrendRow key={trend.id} trend={trend} />
        ))}
      </div>

      {sortedTrends.length === 0 && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">No trends found for this filter.</p>
        </div>
      )}
    </div>
  );
}

const TYPE_LABELS: Record<string, string> = {
  research_explosion: "Explosion",
  emerging_concept: "Emerging",
  novel_methodology: "Methodology",
  citation_acceleration: "Accelerating",
  interdisciplinary_convergence: "Interdisciplinary",
};

function TrendRow({ trend }: { trend: TrendSignal }) {
  const typeLabel = TYPE_LABELS[trend.trendType] ?? trend.trendType;

  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:bg-[var(--secondary)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] rounded px-1.5 py-0.5">
              {typeLabel}
            </span>
            {trend.topic && (
              <span className="text-[10px] text-[var(--muted-foreground)]">
                in {trend.topic.name}
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-semibold text-[var(--foreground)]">
            {trend.name}
          </h3>
          {trend.description && (
            <p className="mt-1 text-sm text-[var(--muted-foreground)] line-clamp-2">
              {trend.description}
            </p>
          )}
        </div>

        <div className="text-right shrink-0">
          <p className="text-lg font-semibold text-[var(--foreground)]">
            +{trend.growthRate}%
          </p>
          <p className="text-[10px] text-[var(--muted-foreground)]">growth</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
        <span>
          Confidence <strong className="text-[var(--foreground)]">{Math.round(trend.confidenceScore * 100)}%</strong>
        </span>
        <span className="text-[var(--border)]">|</span>
        <span>
          Momentum <strong className="text-[var(--foreground)]">{Math.round(trend.momentumScore * 100)}%</strong>
        </span>
        {trend.evidence.length > 0 && (
          <>
            <span className="text-[var(--border)]">|</span>
            <span>{trend.evidence.length} evidence point{trend.evidence.length !== 1 ? "s" : ""}</span>
          </>
        )}
      </div>
    </article>
  );
}
