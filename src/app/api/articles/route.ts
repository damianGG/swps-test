import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://test-www0.swps.pl/api/index.php/v1/content/articles", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer c2hhMjU2Ojg1Njo4NGRhNzY1MzkxYzYwNTVjODk4NDM0NmFmZGJhOWNmMDRlNjFiMjc2NDM4MDljYmJkMTUwNjk0MGNjZGJjODJk",
        "CF-Access-Client-Id": "201b0dc1f065b62c3478598df5a75934.access",
        "CF-Access-Client-Secret": "c7b14b4a29f585013b8eb8d92874f27de6a4daac4f8d19263b1ce37074a1ab49",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}