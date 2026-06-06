"use client";

import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  FileText,
  Download,
  Clock,
  CheckCircle2,
  Users,
  Milestone,
  Lightbulb,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { mockReview } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReviewsPage() {
  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Literature Reviews
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Generate AI-powered research reviews
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              placeholder="Enter a research topic..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Review
              </>
            )}
          </Button>
        </div>

        {/* Generating State */}
        {isGenerating && (
          <div className="mt-6 flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-2 border-[var(--primary)]/30 border-t-[var(--primary)] animate-spin" />
              <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-[var(--primary)]" />
            </div>
            <p className="mt-4 text-sm text-[var(--muted-foreground)]">
              Analyzing literature and generating review...
            </p>
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-[var(--muted-foreground)]">Export:</span>
        <Button size="sm" variant="outline" className="gap-1.5" disabled>
          <Download className="h-3.5 w-3.5" />
          PDF
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5" disabled>
          <FileText className="h-3.5 w-3.5" />
          Markdown
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5" disabled>
          <FileText className="h-3.5 w-3.5" />
          Notion
        </Button>
        <Button size="sm" variant="outline" className="gap-1.5" disabled>
          <FileText className="h-3.5 w-3.5" />
          Google Docs
        </Button>
      </div>

      {/* Completed Review Example */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{mockReview.title}</h2>
          <Badge variant="success" className="ml-2">Completed</Badge>
        </div>

        {/* Overview */}
        {mockReview.overview && (
          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">Overview</h3>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{mockReview.overview}</p>
          </section>
        )}

        {/* Key Papers */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-blue-400" />
            <h3 className="text-base font-semibold text-[var(--foreground)]">Key Papers</h3>
          </div>
          <ul className="space-y-2">
            {mockReview.keyPapers.map((paper, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                {paper}
              </li>
            ))}
          </ul>
        </section>

        {/* Influential Researchers */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-purple-400" />
            <h3 className="text-base font-semibold text-[var(--foreground)]">Influential Researchers</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockReview.researchers.map((name, i) => (
              <Badge key={i} variant="secondary">{name}</Badge>
            ))}
          </div>
        </section>

        {/* Major Milestones */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Milestone className="h-4 w-4 text-amber-400" />
            <h3 className="text-base font-semibold text-[var(--foreground)]">Major Milestones</h3>
          </div>
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-[var(--border)]" />
            {mockReview.milestones.map((milestone, i) => {
              const [year, ...rest] = milestone.split(" - ");
              return (
                <div key={i} className="relative flex items-start gap-3">
                  <div className="absolute -left-4 mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-amber-400 bg-[var(--card)]" />
                  <div>
                    <span className="text-xs font-bold text-amber-400">{year}</span>
                    <p className="text-sm text-[var(--foreground)]">{rest.join(" - ")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* State of the Art */}
        {mockReview.stateOfArt && (
          <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-emerald-400" />
              <h3 className="text-base font-semibold text-[var(--foreground)]">State of the Art</h3>
            </div>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{mockReview.stateOfArt}</p>
          </section>
        )}

        {/* Open Problems */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">Open Problems</h3>
          <ul className="space-y-2">
            {mockReview.openProblems.map((problem, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                {problem}
              </li>
            ))}
          </ul>
        </section>

        {/* Future Directions */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">Future Directions</h3>
          <ul className="space-y-2">
            {mockReview.futureDirections.map((direction, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-[var(--primary)] shrink-0" />
                {direction}
              </li>
            ))}
          </ul>
        </section>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Generated: {new Date(mockReview.createdAt).toLocaleDateString()}
          </span>
          <span>Query: &ldquo;{mockReview.query}&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
