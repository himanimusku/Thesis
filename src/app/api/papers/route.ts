import { NextRequest, NextResponse } from "next/server";
import { searchWorks } from "@/lib/openalex";
import { transformWorks } from "@/lib/transform";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q = sp.get("q") ?? "";
  const topic = sp.get("topic") ?? undefined;
  const author = sp.get("author") ?? undefined;
  const authorSearch = sp.get("authorSearch") ?? undefined;
  const dateFrom = sp.get("dateFrom") ?? undefined;
  const dateTo = sp.get("dateTo") ?? undefined;
  const minCitations = sp.get("minCitations") ? Number(sp.get("minCitations")) : undefined;
  const sort = sp.get("sort") ?? "relevance";
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const perPage = Math.min(100, Math.max(1, Number(sp.get("perPage") ?? 25)));

  try {
    const data = await searchWorks(
      authorSearch ? authorSearch : q,
      { topic, author, dateFrom, dateTo, minCitations },
      sort,
      page,
      perPage,
    );

    const papers = transformWorks(data.results);

    return NextResponse.json({
      papers,
      meta: {
        total: data.meta.count,
        page: data.meta.page,
        perPage: data.meta.per_page,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[api/papers]", message);
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
