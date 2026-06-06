import {
  Sparkles,
  TrendingUp,
  User,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeedItem, Paper, TrendSignal, ResearchDigest } from "@/types";
import { Badge } from "@/components/ui/badge";

const typeConfig = {
  breakthrough: {
    icon: Zap,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    label: "Breakthrough",
  },
  trend: {
    icon: TrendingUp,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    label: "Trend",
  },
  author_update: {
    icon: User,
    accent: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    label: "Author Update",
  },
  digest: {
    icon: Sparkles,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    label: "Digest",
  },
};

function BreakthroughCard({ item }: { item: FeedItem }) {
  const paper = item.data as Paper;
  return (
    <>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
        {paper.title}
      </h3>
      {paper.venue && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {paper.venue} &middot; {paper.citationCount} citations
        </p>
      )}

      {paper.summary?.contributions && paper.summary.contributions.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {paper.summary.contributions.slice(0, 3).map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {c}
            </li>
          ))}
        </ul>
      )}

      {paper.summary?.practicalImpact && (
        <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/10 px-4 py-3">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">
            Why It Matters
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {paper.summary.practicalImpact}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        {paper.pdfUrl && (
          <a
            href={paper.pdfUrl}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
          >
            Read Paper <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {paper.topics[0] && (
          <a
            href={`/trends/${paper.topics[0].slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Explore Trend <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </>
  );
}

function TrendCard({ item }: { item: FeedItem }) {
  const trend = item.data as TrendSignal;
  return (
    <>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
        {trend.name}
      </h3>
      {trend.description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {trend.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Evidence", value: `${trend.evidence.length} signals` },
          {
            label: "Confidence",
            value: `${Math.round(trend.confidenceScore * 100)}%`,
          },
          { label: "Growth", value: `+${trend.growthRate}%` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800/60 px-3 py-2 text-center"
          >
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {trend.evidence.length > 0 && (
        <div className="mt-4 rounded-lg bg-blue-500/5 border border-blue-500/10 px-4 py-3">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
            Thesis Insight
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {trend.evidence[0]}
          </p>
        </div>
      )}

      {trend.topic && (
        <div className="mt-4">
          <a
            href={`/trends/${trend.topic.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Explore Trend <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </>
  );
}

function AuthorUpdateCard({ item }: { item: FeedItem }) {
  const paper = item.data as Paper;
  const primaryAuthor = paper.authors[0];
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
          <User className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {primaryAuthor?.name ?? "Unknown Author"}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Published new research
          </p>
        </div>
      </div>

      <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
        {paper.title}
      </h3>

      {paper.summary?.oneSentence && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {paper.summary.oneSentence}
        </p>
      )}

      <div className="mt-3">
        <a
          href={`/papers/${paper.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline"
        >
          View Paper <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </>
  );
}

function DigestCard({ item }: { item: FeedItem }) {
  const digest = item.data as ResearchDigest;
  return (
    <>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
        {digest.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {digest.content}
      </p>
      {digest.topic && (
        <Badge variant="secondary" className="mt-3">
          {digest.topic.name}
        </Badge>
      )}
      <div className="mt-3">
        <a
          href={`/digests/${digest.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Read Full Digest <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </>
  );
}

const cardRenderers = {
  breakthrough: BreakthroughCard,
  trend: TrendCard,
  author_update: AuthorUpdateCard,
  digest: DigestCard,
};

export function FeedCard({ item }: { item: FeedItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  const Renderer = cardRenderers[item.type];

  return (
    <article
      className={cn(
        "group rounded-xl border bg-white dark:bg-zinc-900/50 p-5 transition-all duration-200",
        "hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700",
        "border-zinc-200 dark:border-zinc-800"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
            config.bg,
            config.accent
          )}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </span>
        {item.subtitle && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {item.subtitle}
          </span>
        )}
        <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          {item.timestamp}
        </span>
      </div>

      <Renderer item={item} />
    </article>
  );
}
