"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Articles error:", error)
  }, [error])

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardContent className="p-6 text-center">
        <div className="text-red-600 mb-4">
          <h2 className="text-xl font-semibold mb-2">Coś poszło nie tak!</h2>
          <p className="mb-4">Nie udało się załadować artykułów.</p>
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Spróbuj ponownie
        </button>
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">Szczegóły techniczne</summary>
          <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono">
            <p>
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p>
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
            <p>
              <strong>Time:</strong> {new Date().toISOString()}
            </p>
          </div>
        </details>
      </CardContent>
    </Card>
  )
}
