"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Quote, Users, Loader2, ExternalLink, TrendingUp, Building2, LogIn } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { computeImpactScore, rankByImpact } from "@/lib/impact-score";
import { useAuth } from "@/contexts/auth-context";
import type { Paper } from "@/types";

const DEFAULT_AUTHORS = [
  { name: "Yann LeCun", id: "A5001226970" },
  { name: "Geoffrey Hinton", id: "A5108093963" },
  { name: "Fei-Fei Li", id: "A5100450462" },
  { name: "Demis Hassabis", id: "A5005349213" },
  { name: "Ilya Sutskever", id: "A5006446297" },
];

export default function Home() {
  const { user, profile, loading: authLoading } = useAuth();
  const [recentPapers, setRecentPapers] = useState<Paper[]>([]);
  const [authorPapers, setAuthorPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const followedAuthors =
    profile?.followedAuthors && profile.followedAuthors.length > 0
      ? profile.followedAuthors
      : DEFAULT_AUTHORS;

  const interests = profile?.interests ?? [];

  useEffect(() => {
    if (authLoading) return;

    async function fetchData() {
      setLoading(true);
      setError(null);

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      const dateFrom = oneMonthAgo.toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);

      try {
        const authorIds = followedAuthors.map((a) => a.id).join("|");

        if (interests.length > 0) {
          const topicFetches = interests.slice(0, 5).map((topic) =>
            fetch(`/api/papers?topic=${encodeURIComponent(topic)}&sort=citations&perPage=15&dateFrom=${dateFrom}&dateTo=${today}`)
          );

          const [authorRes, ...topicResponses] = await Promise.all([
            fetch(`/api/papers?author=${encodeURIComponent(authorIds)}&sort=date&perPage=5`),
            ...topicFetches,
          ]);

          const authorData = await authorRes.json();
          const topicResults = await Promise.all(topicResponses.map((r) => r.json()));

          const allTopicPapers: Paper[] = [];
          const seenIds = new Set<string>();
          for (const result of topicResults) {
            for (const paper of (result.papers ?? [])) {
              if (!seenIds.has(paper.id)) {
                seenIds.add(paper.id);
                allTopicPapers.push(paper);
              }
            }
          }

          setRecentPapers(rankByImpact(allTopicPapers).slice(0, 12));
          setAuthorPapers(authorData.papers ?? []);
        } else {
          const [recentRes, authorRes] = await Promise.all([
            fetch(`/api/papers?sort=citations&perPage=30&dateFrom=${dateFrom}&dateTo=${today}`),
            fetch(`/api/papers?author=${encodeURIComponent(authorIds)}&sort=date&perPage=5`),
          ]);

          const recentData = await recentRes.json();
          const authorData = await authorRes.json();

          if (recentData.error) throw new Error(recentData.error);

          setRecentPapers(rankByImpact(recentData.papers ?? []).slice(0, 10));
          setAuthorPapers(authorData.papers ?? []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authLoading, interests.join(","), followedAuthors.map((a) => a.id).join(",")]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          {profile?.displayName ? `Hi, ${profile.displayName.split(" ")[0]}` : "Recent Research"}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {interests.length > 0
            ? `Papers in ${interests.slice(0, 3).join(", ")}${interests.length > 3 ? ` +${interests.length - 3} more` : ""} — last month, sorted by early citations`
            : "Top papers from the last month"}
        </p>
        {!user && (
          <Link
            href="/signin"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--primary)] hover:bg-[var(--accent)] transition-colors"
          >
            <LogIn className="h-3 w-3" />
            Sign in to personalize your feed
          </Link>
        )}
      </header>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
          <span className="ml-3 text-sm text-[var(--muted-foreground)]">
            Fetching latest research...
          </span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          {/* Recent papers ranked by impact — filtered by interests if set */}
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
              {interests.length > 0 ? "For You" : "Highest Impact"}
            </h2>
            <div className="space-y-3">
              {recentPapers.map((paper) => (
                <PaperRow key={paper.id} paper={paper} />
              ))}
              {recentPapers.length === 0 && (
                <p className="text-sm text-[var(--muted-foreground)] py-4">
                  No recent papers found in your areas of interest.
                </p>
              )}
            </div>
            {recentPapers.length > 0 && (
              <Link
                href="/papers"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
              >
                View more papers &rarr;
              </Link>
            )}
          </section>

          {/* Papers from followed authors */}
          {authorPapers.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
                From Authors You Follow
              </h2>
              <div className="space-y-3">
                {authorPapers.map((paper) => (
                  <PaperRow key={paper.id} paper={paper} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ImpactBadge({ score }: { score: number }) {
  let label: string;
  let color: string;

  if (score >= 70) {
    label = "Very High";
    color = "bg-emerald-100 text-emerald-700";
  } else if (score >= 50) {
    label = "High";
    color = "bg-blue-100 text-blue-700";
  } else if (score >= 30) {
    label = "Moderate";
    color = "bg-amber-100 text-amber-700";
  } else {
    return null;
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${color}`}>
      <TrendingUp className="h-2.5 w-2.5" />
      {label} Impact
    </span>
  );
}

function PaperRow({ paper }: { paper: Paper }) {
  const score = computeImpactScore(paper);

  return (
    <Link href={`/papers/${paper.id}`}>
      <article className="group rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-[var(--primary)]/40 hover:shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-medium leading-snug text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
            {paper.title}
          </h3>
          <ImpactBadge score={score} />
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {paper.authors.slice(0, 3).map((a) => a.name).join(", ")}
            {paper.authors.length > 3 && ` +${paper.authors.length - 3}`}
          </span>
        </div>

        {paper.institutions && paper.institutions.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <Building2 className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {paper.institutions.slice(0, 3).map((i) => i.name).join(", ")}
              {paper.institutions.length > 3 && ` +${paper.institutions.length - 3}`}
            </span>
          </div>
        )}

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
          {paper.sourceUrl && (
            <span className="flex items-center gap-1 text-[var(--primary)]">
              <ExternalLink className="h-3 w-3" />
              Source
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
