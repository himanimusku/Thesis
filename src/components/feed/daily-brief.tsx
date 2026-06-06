import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DailyBriefData {
  date: string;
  totalPapers: number;
  dominantThemes: string[];
  highlight: string;
  topPaper?: { id: string; title: string };
}

export function DailyBrief({ brief }: { brief: DailyBriefData }) {
  const formattedDate = new Date(brief.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3 w-3" />
            Daily Brief
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {formattedDate}
          </span>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {brief.totalPapers} new papers
          </span>{" "}
          across your research interests today.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {brief.dominantThemes.map((theme) => (
            <Badge key={theme} variant="outline" className="text-xs">
              {theme}
            </Badge>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {brief.highlight}
        </p>

        <a
          href="/daily-brief"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Full Brief <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
