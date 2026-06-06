import Link from "next/link";
import { Calendar, Quote, Users } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Paper } from "@/types";

interface PaperCardProps {
  paper: Paper;
  className?: string;
}

export function PaperCard({ paper, className }: PaperCardProps) {
  return (
    <Link href={`/papers/${paper.id}`}>
      <article
        className={cn(
          "group rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-[var(--primary)]/40 hover:shadow-sm",
          className
        )}
      >
        <h3 className="text-[15px] font-medium leading-snug text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
          {paper.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {paper.authors.slice(0, 3).map((a) => a.name).join(", ")}
            {paper.authors.length > 3 && ` +${paper.authors.length - 3}`}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--muted-foreground)]">
          {paper.venue && (
            <span className="rounded bg-[var(--secondary)] px-2 py-0.5 font-medium text-[var(--secondary-foreground)]">
              {paper.venue}
            </span>
          )}
          {paper.publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(paper.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Quote className="h-3 w-3" />
            {formatNumber(paper.citationCount)} citations
          </span>
        </div>

        {paper.topics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {paper.topics.slice(0, 3).map((topic) => (
              <Badge
                key={topic.id}
                variant="secondary"
                className="text-[10px] px-2 py-0"
              >
                {topic.name}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
