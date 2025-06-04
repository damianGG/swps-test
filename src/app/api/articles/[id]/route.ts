import { NextResponse } from "next/server"
import { fetchJoomlaArticle } from "@/lib/joomla-api"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await fetchJoomlaArticle(params.id)
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
