"use client";

import { ArrowUpRight, TrendingUp, Sparkles, FlaskConical, Zap, GitMerge } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { TrendSignal } from "@/types";

const trendTypeConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  research_explosion: { label: "Research Explosion", color: "bg-red-500/15 text-red-400 border-red-500/30", icon: TrendingUp },
  emerging_concept: { label: "Emerging Concept", color: "bg-blue-500/15 text-blue-400 border-blue-500/30", icon: Sparkles },
  novel_methodology: { label: "Novel Methodology", color: "bg-purple-500/15 text-purple-400 border-purple-500/30", icon: FlaskConical },
  citation_acceleration: { label: "Citation Acceleration", color: "bg-green-500/15 text-green-400 border-green-500/30", icon: Zap },
  interdisciplinary_convergence: { label: "Interdisciplinary Convergence", color: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: GitMerge },
};

interface TrendCardProps {
  trend: TrendSignal;
  className?: string;
}

export function TrendCard({ trend, className }: TrendCardProps) {
  const config = trendTypeConfig[trend.trendType] ?? trendTypeConfig.emerging_concept;
  const Icon = config.icon;

  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--primary)]/50 hover:shadow-lg hover:shadow-[var(--primary)]/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn("text-[10px] border", config.color)}>
              <Icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {trend.name}
          </h3>
          {trend.description && (
            <p className="mt-1.5 text-sm text-[var(--muted-foreground)] line-clamp-2">
              {trend.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-emerald-400 shrink-0">
          <ArrowUpRight className="h-4 w-4" />
          <span className="text-sm font-bold">{trend.growthRate}%</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--muted-foreground)]">Confidence</span>
            <span className="text-xs font-medium text-[var(--foreground)]">
              {Math.round(trend.confidenceScore * 100)}%
            </span>
          </div>
          <Progress value={trend.confidenceScore * 100} className="h-1.5" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--muted-foreground)]">Momentum</span>
            <span className="text-xs font-medium text-[var(--foreground)]">
              {Math.round(trend.momentumScore * 100)}%
            </span>
          </div>
          <Progress value={trend.momentumScore * 100} className="h-1.5" />
        </div>
      </div>

      {trend.evidence.length > 0 && (
        <div className="mt-4 space-y-1">
          <span className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
            Evidence
          </span>
          <ul className="space-y-1">
            {trend.evidence.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--muted-foreground)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {trend.topic && (
        <div className="mt-4 pt-3 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--muted-foreground)]">Related: </span>
          <span className="text-xs font-medium text-[var(--primary)]">
            {trend.topic.name}
          </span>
        </div>
      )}
    </article>
  );
}
