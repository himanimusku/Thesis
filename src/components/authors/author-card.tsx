import Link from "next/link";
import { Award, FileText, BookOpen } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { Author } from "@/types";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.id}`}>
      <div
        className={cn(
          "group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:bg-[var(--accent)] hover:border-[var(--accent)]",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)]">
            {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[var(--card-foreground)] group-hover:text-[var(--accent-foreground)] truncate">
              {author.name}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] truncate">
              {author.affiliations.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-[var(--accent)]/50 px-2 py-1.5">
            <div className="flex items-center justify-center gap-1 text-xs text-[var(--muted-foreground)]">
              <Award className="h-3 w-3" />
              <span>h-index</span>
            </div>
            <p className="text-sm font-semibold text-[var(--card-foreground)]">
              {author.hIndex ?? "—"}
            </p>
          </div>
          <div className="rounded-lg bg-[var(--accent)]/50 px-2 py-1.5">
            <div className="flex items-center justify-center gap-1 text-xs text-[var(--muted-foreground)]">
              <BookOpen className="h-3 w-3" />
              <span>Citations</span>
            </div>
            <p className="text-sm font-semibold text-[var(--card-foreground)]">
              {author.citationCount ? formatNumber(author.citationCount) : "—"}
            </p>
          </div>
          <div className="rounded-lg bg-[var(--accent)]/50 px-2 py-1.5">
            <div className="flex items-center justify-center gap-1 text-xs text-[var(--muted-foreground)]">
              <FileText className="h-3 w-3" />
              <span>Papers</span>
            </div>
            <p className="text-sm font-semibold text-[var(--card-foreground)]">
              {author.paperCount ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
