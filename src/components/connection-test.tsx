"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ConnectionTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    setTestResult("")

    try {
      // Test basic connectivity
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      if (response.ok) {
        setTestResult(`✅ ${data.message}`)
      } else {
        setTestResult(`❌ Błąd: ${data.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Błąd połączenia: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Test połączenia</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={testConnection}
          disabled={testing}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {testing ? "Testowanie..." : "Testuj połączenie z API"}
        </button>
        {testResult && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm">{testResult}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
