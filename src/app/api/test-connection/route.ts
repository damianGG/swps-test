import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://test-www0.swps.pl/api/index.php/v1/content/articles", {
      headers: {
        Authorization:
          "Bearer c2hhMjU2Ojg1Njo4NGRhNzY1MzkxYzYwNTVjODk4NDM0NmFmZGJhOWNmMDRlNjFiMjc2NDM4MDljYmJkMTUwNjk0MGNjZGJjODJk",
        "CF-Access-Client-Id": "201b0dc1f065b62c3478598df5a75934.access",
        "CF-Access-Client-Secret": "c7b14b4a29f585013b8eb8d92874f27de6a4daac4f8d19263b1ce37074a1ab49",
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
