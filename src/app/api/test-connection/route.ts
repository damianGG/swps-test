import { NextResponse } from "next/server"

const JOOMLA_BASE_URL = process.env.JOOMLA_API_BASE_URL ??
  "https://test-www0.swps.pl/api/index.php/v1"
const JOOMLA_BEARER = process.env.JOOMLA_API_BEARER ?? ""
const CF_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID ?? ""
const CF_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET ?? ""

export async function GET() {
  try {
    const response = await fetch(`${JOOMLA_BASE_URL}/content/articles`, {
      headers: {
        ...(JOOMLA_BEARER && { Authorization: `Bearer ${JOOMLA_BEARER}` }),
        ...(CF_CLIENT_ID && { "CF-Access-Client-Id": CF_CLIENT_ID }),
        ...(CF_CLIENT_SECRET && { "CF-Access-Client-Secret": CF_CLIENT_SECRET }),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({
        message: `Połączenie działa! Znaleziono ${data.data?.length || 0} artykułów.`,
        status: response.status,
      })
    } else {
      return NextResponse.json(
        {
          error: `API zwróciło błąd: ${response.status} ${response.statusText}`,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: `Błąd połączenia: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
