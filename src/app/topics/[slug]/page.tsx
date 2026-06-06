"use client";

import { use } from "react";
import Link from "next/link";
import {
  TrendingUp,
  FileText,
  Users,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { mockTopics, mockPapers, mockTrends, mockAuthors } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { AuthorCard } from "@/components/authors/author-card";

export default function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const topic = mockTopics.find((t) => t.slug === slug);

  if (!topic) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--muted-foreground)]">Topic not found.</p>
      </div>
    );
  }

  const papers = mockPapers.filter((p) =>
    p.topics.some((t) => t.slug === slug)
  );
  const trends = mockTrends.filter((t) => t.topic?.slug === slug);
  const researchers = mockAuthors.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Overview */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
            {topic.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-6">
          <Stat
            icon={<FileText className="h-4 w-4" />}
            label="Papers"
            value={formatNumber(topic.paperCount)}
          />
          <Stat
            icon={<TrendingUp className="h-4 w-4" />}
            label="Velocity"
            value={`+${topic.velocity}%`}
            accent
          />
          <Stat
            icon={<Users className="h-4 w-4" />}
            label="Researchers"
            value={formatNumber(researchers.length)}
          />
        </div>
      </header>

      {/* Latest Research */}
      <Section title="Latest Research" icon={<BookOpen className="h-5 w-5" />}>
        {papers.length === 0 ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            No papers found for this topic yet.
          </p>
        ) : (
          <div className="space-y-3">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:bg-[var(--accent)]"
              >
                <h4 className="font-medium text-[var(--card-foreground)]">
                  {paper.title}
                </h4>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {paper.authors.map((a) => a.name).join(", ")} ·{" "}
                  {paper.venue} · {paper.citationCount} citations
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Key Researchers */}
      <Section title="Key Researchers" icon={<Users className="h-5 w-5" />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {researchers.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </Section>

      {/* Research Velocity */}
      <Section title="Research Velocity" icon={<TrendingUp className="h-5 w-5" />}>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-emerald-500">
              +{topic.velocity}%
            </span>
            <span className="text-sm text-[var(--muted-foreground)]">
              growth in publications this quarter
            </span>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--accent)]">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${Math.min(topic.velocity * 3, 100)}%` }}
            />
          </div>
        </div>
      </Section>

      {/* Thesis Insights */}
      <Section title="Thesis Insights" icon={<BookOpen className="h-5 w-5" />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <InsightCard
            title="What's Changing?"
            body="Research in this area is shifting towards more integrated, multi-modal approaches. Traditional boundaries between sub-disciplines are dissolving as teams adopt cross-functional methodologies."
          />
          <InsightCard
            title="What's Accelerating?"
            body="Publication rates are climbing steadily, with major labs investing heavily. Pre-print submissions have doubled in the last quarter, indicating strong momentum."
          />
          <InsightCard
            title="What Should Researchers Watch?"
            body="Emerging intersections with adjacent fields present high-impact collaboration opportunities. New benchmark datasets are enabling more rigorous comparative studies."
          />
        </div>
      </Section>

      {/* Emerging Trends */}
      {trends.length > 0 && (
        <Section title="Emerging Trends" icon={<TrendingUp className="h-5 w-5" />}>
          <div className="space-y-3">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-[var(--card-foreground)]">
                    {trend.name}
                  </h4>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                    +{trend.growthRate}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {trend.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trend.evidence.slice(0, 3).map((e, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2 text-[var(--foreground)]">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[var(--muted-foreground)]">{icon}</span>
      <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
      <span
        className={`text-sm font-semibold ${accent ? "text-emerald-500" : "text-[var(--foreground)]"}`}
      >
        {value}
      </span>
    </div>
  );
}

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <h4 className="font-medium text-[var(--card-foreground)]">{title}</h4>
      <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
