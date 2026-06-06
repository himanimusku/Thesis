import { NextRequest, NextResponse } from "next/server";
import { getTrendingWorks } from "@/lib/openalex";
import { transformWorks } from "@/lib/transform";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const date = sp.get("date") ?? new Date().toISOString().slice(0, 10);

  try {
    const data = await getTrendingWorks(undefined, 1, 10);
    const papers = transformWorks(data.results);

    const topPaper = papers[0] ?? null;
    const dominantThemes = Array.from(
      new Set(papers.flatMap((p) => p.topics.map((t) => t.name))),
    ).slice(0, 5);

    return NextResponse.json({
      briefing: {
        date,
        totalPapers: data.meta.count,
        dominantThemes,
        highlight: topPaper
          ? `Today's most-cited new paper: "${topPaper.title}" with ${topPaper.citationCount} citations.`
          : "No notable papers detected for this period.",
        topPaper,
        recentPapers: papers.slice(0, 5),
      },
    });
  } catch (err) {
    console.error("[api/briefings]", err);
    return NextResponse.json(
      { error: "Failed to generate briefing" },
      { status: 502 },
    );
  }
}
