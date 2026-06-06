import { Beaker, Target, Lightbulb, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      {/* Hero */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Beaker className="h-8 w-8 text-[var(--primary)]" />
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            About Thesis
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
          The intelligence layer for scientific research.
        </p>
      </header>

      {/* Purpose */}
      <section className="mb-12 space-y-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Purpose</h2>

        <p className="text-[var(--foreground)] leading-relaxed">
          Scientific knowledge is growing faster than any human can consume. Researchers spend
          hours every week searching, filtering, and reading papers just to stay current.
          Thesis solves this problem.
        </p>

        <p className="text-[var(--foreground)] leading-relaxed">
          Thesis acts as an AI research analyst that continuously monitors the scientific
          world and delivers personalized intelligence. Instead of searching for papers, users
          open Thesis and instantly understand what happened in their fields, which
          breakthroughs matter, what trends are emerging, and where the biggest opportunities
          may be.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <Target className="h-5 w-5 text-[var(--primary)] mb-3" />
            <h3 className="font-semibold text-[var(--foreground)] mb-1">Real-Time Monitoring</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Track new papers, citation acceleration, and emerging trends as they happen.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <Lightbulb className="h-5 w-5 text-amber-500 mb-3" />
            <h3 className="font-semibold text-[var(--foreground)] mb-1">AI Intelligence</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Automated summaries, trend detection, and research gap analysis powered by AI.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <Users className="h-5 w-5 text-emerald-500 mb-3" />
            <h3 className="font-semibold text-[var(--foreground)] mb-1">Follow Researchers</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Stay updated on new work from the researchers driving progress in your fields.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <Globe className="h-5 w-5 text-blue-500 mb-3" />
            <h3 className="font-semibold text-[var(--foreground)] mb-1">Global Coverage</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Indexed from OpenAlex, covering over 250 million scholarly works worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Vision</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-6">
          <p className="text-[var(--foreground)] leading-relaxed italic">
            &ldquo;Thesis becomes the operating system for scientific knowledge. Users should
            no longer need to manually monitor journals, arXiv, conference proceedings, or
            citation networks. The ultimate goal is to become the default interface through
            which people understand the evolution of science.&rdquo;
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">Founder</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-indigo-400 flex items-center justify-center text-xl font-bold text-white">
              HM
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Himani Musku
              </h3>
              <p className="text-sm text-[var(--primary)] font-medium mb-3">
                Creator & Builder
              </p>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                Himani is passionate about making scientific knowledge more accessible and
                actionable. Frustrated by the difficulty of staying current with the exponential
                growth of research publications, she built Thesis to solve this problem — not
                just for herself, but for every researcher, student, engineer, and curious mind
                who wants to understand where science is heading.
              </p>
              <p className="mt-3 text-sm text-[var(--foreground)] leading-relaxed">
                Thesis reflects her belief that the right information, delivered at the right
                time, can accelerate discovery and unlock opportunities that would otherwise be
                missed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Data Sources</h2>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          Thesis is powered by{" "}
          <a
            href="https://openalex.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            OpenAlex
          </a>
          , a fully open catalog of the global research system covering over 250 million
          scholarly works, 90 million authors, and 100,000 research concepts.
        </p>
      </section>
    </div>
  );
}
