import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ArticlesLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <div className="h-10 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      {/* Stats skeleton */}
      <div className="flex justify-center items-center gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-6 w-8 bg-gray-300 rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-full">
            <CardHeader className="p-0">
              <div className="h-48 bg-gray-300 rounded-t-lg animate-pulse"></div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-5 w-12 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
