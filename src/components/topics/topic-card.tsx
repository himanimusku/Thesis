import Link from "next/link";
import { TrendingUp, FileText } from "lucide-react";
import { cn, formatNumber, truncate } from "@/lib/utils";
import { Topic } from "@/types";

interface TopicCardProps {
  topic: Topic;
  className?: string;
}

export function TopicCard({ topic, className }: TopicCardProps) {
  return (
    <Link href={`/topics/${topic.slug}`}>
      <div
        className={cn(
          "group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:bg-[var(--accent)] hover:border-[var(--accent)]",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-[var(--card-foreground)] group-hover:text-[var(--accent-foreground)]">
            {topic.name}
          </h3>
          <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{topic.velocity}%</span>
          </div>
        </div>

        {topic.description && (
          <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
            {truncate(topic.description, 120)}
          </p>
        )}

        <div className="mt-4 flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {formatNumber(topic.paperCount)} papers
          </span>
        </div>
      </div>
    </Link>
  );
}
