"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page error:", error)
  }, [error])

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-600 mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">Ups! Coś poszło nie tak</h2>
          <p className="mb-4">Nie udało się załadować strony.</p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Spróbuj ponownie
        </button>
        <div className="mt-6 text-sm text-gray-600">
          <p>Jeśli problem się powtarza, skontaktuj się z administratorem.</p>
        </div>
      </div>
    </main>
  )
}
