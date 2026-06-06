import { NextRequest, NextResponse } from "next/server";
import { searchWorks, searchAuthors, searchTopics } from "@/lib/openalex";
import { transformWorks, transformAuthors, transformTopics } from "@/lib/transform";

type SearchType = "papers" | "authors" | "topics" | "all";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const q = sp.get("q") ?? "";
  const type = (sp.get("type") ?? "all") as SearchType;
  const perPage = Math.min(20, Math.max(1, Number(sp.get("perPage") ?? 10)));

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    const results: Record<string, unknown> = {};

    const promises: Promise<void>[] = [];

    if (type === "all" || type === "papers") {
      promises.push(
        searchWorks(q, undefined, "relevance", 1, perPage).then((data) => {
          results.papers = transformWorks(data.results);
          results.paperCount = data.meta.count;
        }),
      );
    }

    if (type === "all" || type === "authors") {
      promises.push(
        searchAuthors(q, "relevance_score", 1, perPage).then((data) => {
          results.authors = transformAuthors(data.results);
          results.authorCount = data.meta.count;
        }),
      );
    }

    if (type === "all" || type === "topics") {
      promises.push(
        searchTopics(q, "relevance_score", 1, perPage).then((data) => {
          results.topics = transformTopics(data.results);
          results.topicCount = data.meta.count;
        }),
      );
    }

    await Promise.all(promises);

    return NextResponse.json({ query: q, type, ...results });
  } catch (err) {
    console.error("[api/search]", err);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 502 },
    );
  }
}
