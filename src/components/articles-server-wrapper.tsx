import { fetchJoomlaArticles } from "@/lib/joomla-api"
import { ArticlesClientGrid } from "./articles-client-grid"

export default async function ArticlesServerWrapper() {
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

    return <ArticlesClientGrid articles={sortedArticles} meta={articlesData.meta} />
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
