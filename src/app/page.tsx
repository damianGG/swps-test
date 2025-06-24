

import SWPSMenu from "@/components/menu"
import SWPSHero from "@/components/hero"
import SWPSFooter from "@/components/footer"
import { JoomlaArticleComponent } from "@/components/joomla-article"
import ArticlesGrid from "@/components/articles-grid"
import { ArticlesLoading } from "@/components/articles-loading"
import { Suspense } from "react"
import ArticleViewer from "@/components/article-viewer"
import ArticlesList from "@/components/articles-list"

export default function Page() {
  return (
    <div>
      <SWPSMenu />
      <SWPSHero />
      <main className="container mx-auto py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Dlaczego SWPS?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Uniwersytet SWPS to miejsce, gdzie tradycja akademicka spotyka się z nowoczesnością. Oferujemy wysokiej
            jakości edukację, która przygotowuje do wyzwań współczesnego świata.
          </p>
          {/* <div className="container mx-auto">
            <JoomlaArticleComponent articleId="5" />
          </div>
          <div className="container mx-auto px-4 py-12">
            <Suspense fallback={<ArticlesLoading />}>
              <ArticlesGrid />
            </Suspense>
          </div> */}

          <ArticleViewer />
          <ArticlesList />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Nowoczesne podejście</h3>
              <p className="text-gray-600">Łączymy teorię z praktyką, wykorzystując najnowsze metody nauczania.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Międzynarodowość</h3>
              <p className="text-gray-600">Programy wymiany i współpraca z uczelniami na całym świecie.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Wsparcie kariery</h3>
              <p className="text-gray-600">Biuro Karier pomaga w znalezieniu praktyk i pierwszej pracy.</p>
            </div>
          </div>
        </div>
      </main>
      <SWPSFooter />
    </div>
  )
}