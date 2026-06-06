import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Quote,
  Building,
  ExternalLink,
  Target,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { getWork, reconstructAbstract } from "@/lib/openalex";
import { transformWork } from "@/lib/transform";

interface PaperDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaperDetailPage({ params }: PaperDetailPageProps) {
  const { id } = await params;

  let paper;
  try {
    const work = await getWork(id);
    paper = transformWork(work);
  } catch {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/papers"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Papers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Main */}
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h1 className="text-xl font-bold text-[var(--foreground)] leading-snug">
              {paper.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {paper.venue && (
                <Badge variant="outline">{paper.venue}</Badge>
              )}
              {paper.publishedDate && (
                <span className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(paper.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {paper.doi && (
                <a
                  href={paper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-[var(--primary)] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  DOI
                </a>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {paper.pdfUrl && (
                <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Read PDF
                  </Button>
                </a>
              )}
              {paper.sourceUrl && (
                <a href={paper.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    Source
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Authors */}
          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">Authors</h2>
            <div className="flex flex-wrap gap-2">
              {paper.authors.map((author) => (
                <div
                  key={author.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                >
                  <div className="h-6 w-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[10px] font-medium text-[var(--primary)]">
                    {author.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  {author.name}
                </div>
              ))}
            </div>
          </section>

          {/* Abstract */}
          {paper.abstract && (
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">Abstract</h2>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {paper.abstract}
              </p>
            </section>
          )}

          {/* Topics */}
          {paper.topics.length > 0 && (
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {paper.topics.map((t) => (
                  <Link key={t.id} href={`/topics/${t.slug}`}>
                    <Badge variant="secondary">{t.name}</Badge>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4 sticky top-20">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Quick Stats</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted-foreground)]">Citations</span>
                <span className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1">
                  <Quote className="h-3.5 w-3.5" />
                  {formatNumber(paper.citationCount)}
                </span>
              </div>

              {paper.publishedDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">Published</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {new Date(paper.publishedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {paper.venue && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">Venue</span>
                  <span className="text-xs font-medium">{paper.venue}</span>
                </div>
              )}
            </div>

            {paper.institutions.length > 0 && (
              <div className="pt-3 border-t border-[var(--border)]">
                <span className="text-xs font-medium text-[var(--muted-foreground)]">Institutions</span>
                <div className="mt-2 space-y-1.5">
                  {paper.institutions.map((inst) => (
                    <div key={inst.id} className="flex items-center gap-1.5 text-sm text-[var(--foreground)]">
                      <Building className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                      {inst.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
