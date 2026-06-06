import { NextRequest, NextResponse } from "next/server";
import { getWork } from "@/lib/openalex";
import { transformWork } from "@/lib/transform";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const work = await getWork(id);
    const paper = transformWork(work);

    paper.summary = {
      oneSentence: undefined,
      executive: undefined,
      technical: undefined,
      contributions: [],
      limitations: [],
      futureWork: [],
      practicalImpact: undefined,
      relationToLit: undefined,
    };

    return NextResponse.json({ paper });
  } catch (err) {
    console.error(`[api/papers/${id}]`, err);
    return NextResponse.json(
      { error: "Paper not found" },
      { status: 404 },
    );
  }
}
