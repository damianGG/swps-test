"use client"

import { ArticleCard } from "./article-card"

interface ArticlesClientGridProps {
  articles: Array<{
    id: string
    attributes: {
      id: number
      title: string
      alias: string
      created: string
      text: string
      images: {
        image_intro?: string
        image_intro_alt?: string
      }
      tags: Record<string, string>
      featured: number
      hits: number
    }
  }>
  meta: {
    "total-pages": number
  }
}

export function ArticlesClientGrid({ articles, meta }: ArticlesClientGridProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Najnowsze artykuły</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Odkryj najnowsze artykuły, badania i insights z naszej społeczności akademickiej
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">{articles.length}</div>
          <div>Artykułów</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">
            {articles.filter((a) => a.attributes.featured === 1).length}
          </div>
          <div>Wyróżnionych</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg text-gray-900">
            {articles.reduce((sum, a) => sum + a.attributes.hits, 0)}
          </div>
          <div>Wyświetleń</div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load more placeholder */}
      {meta["total-pages"] > 1 && (
        <div className="text-center">
          <div className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg">Strona 1 z {meta["total-pages"]}</div>
        </div>
      )}
    </div>
  )
}
