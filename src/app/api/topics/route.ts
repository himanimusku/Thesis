import { NextRequest, NextResponse } from "next/server";
import { searchTopics } from "@/lib/openalex";
import { transformTopics } from "@/lib/transform";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q = sp.get("q") ?? "";
  const sort = sp.get("sort") ?? (q ? "relevance" : "paper_count");
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const perPage = Math.min(100, Math.max(1, Number(sp.get("perPage") ?? 25)));

  try {
    const data = await searchTopics(q, sort, page, perPage);
    const topics = transformTopics(data.results);

    return NextResponse.json({
      topics,
      meta: {
        total: data.meta.count,
        page: data.meta.page,
        perPage: data.meta.per_page,
      },
    });
  } catch (err) {
    console.error("[api/topics]", err);
    return NextResponse.json(
      { error: "Failed to fetch topics from OpenAlex" },
      { status: 502 },
    );
  }
}
