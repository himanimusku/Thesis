"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  FileText,
  Loader2,
  Plus,
  ArrowLeft,
  Calendar,
  Quote,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { Author, Paper } from "@/types";

export default function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [author, setAuthor] = useState<Author | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      try {
        const [authorRes, papersRes] = await Promise.all([
          fetch(`/api/authors?q=${encodeURIComponent(id)}&perPage=1`),
          fetch(`/api/papers?author=${encodeURIComponent(id)}&sort=date&perPage=10`),
        ]);

        const authorData = await authorRes.json();
        const papersData = await papersRes.json();

        if (authorData.authors?.length > 0) {
          setAuthor(authorData.authors[0]);
        } else {
          setError("Researcher not found.");
        }

        setPapers(papersData.papers ?? []);
      } catch {
        setError("Failed to load researcher data.");
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-5 w-5 animate-spin text-[var(--primary)]" />
        <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading researcher...</span>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-[var(--muted-foreground)]">{error ?? "Researcher not found."}</p>
        <Link href="/authors" className="text-sm text-[var(--primary)] hover:underline">
          &larr; Back to Researchers
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-8">
      <Link
        href="/authors"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Researchers
      </Link>

      {/* Profile Header */}
      <header className="mb-10">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-lg font-bold text-[var(--primary)]">
            {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {author.name}
            </h1>
            {author.affiliations.length > 0 && (
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {author.affiliations.join(" · ")}
              </p>
            )}
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]">
            <Plus className="h-4 w-4" />
            Follow
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {author.hIndex != null && (
            <StatBlock
              icon={<Award className="h-4 w-4" />}
              label="h-index"
              value={String(author.hIndex)}
            />
          )}
          {author.citationCount != null && (
            <StatBlock
              icon={<BookOpen className="h-4 w-4" />}
              label="Citations"
              value={formatNumber(author.citationCount)}
            />
          )}
          {author.paperCount != null && (
            <StatBlock
              icon={<FileText className="h-4 w-4" />}
              label="Papers"
              value={String(author.paperCount)}
            />
          )}
        </div>
      </header>

      {/* Publications */}
      <section>
        <div className="mb-4 flex items-center gap-2 text-[var(--foreground)]">
          <FileText className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Recent Publications</h2>
        </div>
        {papers.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            No papers found for this researcher.
          </p>
        ) : (
          <div className="space-y-3">
            {papers.map((paper) => (
              <Link key={paper.id} href={`/papers/${paper.id}`}>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/40 hover:shadow-sm">
                  <h4 className="text-[15px] font-medium text-[var(--foreground)] leading-snug line-clamp-2">
                    {paper.title}
                  </h4>
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5">
      <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-0.5 text-lg font-semibold text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}
