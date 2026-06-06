import { NextRequest, NextResponse } from "next/server";
import { searchAuthors, getAuthor } from "@/lib/openalex";
import { transformAuthors, transformAuthor } from "@/lib/transform";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q = sp.get("q") ?? "";
  const sort = sp.get("sort") ?? (q ? "relevance" : "citations");
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const perPage = Math.min(100, Math.max(1, Number(sp.get("perPage") ?? 25)));

  try {
    if (q && /^A\d+$/.test(q)) {
      const oa = await getAuthor(q);
      const author = transformAuthor(oa);
      return NextResponse.json({
        authors: [author],
        meta: { total: 1, page: 1, perPage: 1 },
      });
    }

    const data = await searchAuthors(q, sort, page, perPage);
    const authors = transformAuthors(data.results);

    return NextResponse.json({
      authors,
      meta: {
        total: data.meta.count,
        page: data.meta.page,
        perPage: data.meta.per_page,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[api/authors]", message);
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
