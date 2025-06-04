import { fetchJoomlaArticles } from "@/lib/joomla-api"
import { ArticleCard } from "./article-card"

export default async function ArticlesGrid() {
  try {
    const articlesData = await fetchJoomlaArticles()
    const articles = articlesData.data

    // Sortuj artykuły: najpierw wyróżnione, potem według daty
    const sortedArticles = articles.sort((a, b) => {
      // Najpierw sortuj według featured (1 = featured, 0 = not featured)
      if (a.attributes.featured !== b.attributes.featured) {
        return b.attributes.featured - a.attributes.featured
      }
      // Potem według daty (najnowsze pierwsze)
      return new Date(b.attributes.created).getTime() - new Date(a.attributes.created).getTime()
    })

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
          {sortedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load more placeholder */}
        {articlesData.meta["total-pages"] > 1 && (
          <div className="text-center">
            <div className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg">
              Strona 1 z {articlesData.meta["total-pages"]}
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <h2 className="text-xl font-semibold mb-2">Błąd ładowania artykułów</h2>
          <p className="mb-4">{error instanceof Error ? error.message : "Wystąpił nieznany błąd"}</p>
          <div className="text-sm text-gray-600">
            <p>Sprawdź połączenie z internetem lub spróbuj ponownie później.</p>
          </div>
        </div>
      </div>
    )
  }
}
