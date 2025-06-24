import JoomlaArticleServer from "@/components/joomla-article-server"
import { Suspense } from "react"

interface ArticlePageProps {
    params: {
        id: string
    }
}

function LoadingArticle() {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="animate-pulse">
                <div className="bg-gray-300 h-64 md:h-80 w-full rounded-lg mb-6"></div>
                <div className="space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ArticlePage({ params }: ArticlePageProps) {
    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto">
                <Suspense fallback={<LoadingArticle />}>
                    <JoomlaArticleServer articleId={params.id} />
                </Suspense>
            </div>
        </main>
    )
}

export function generateStaticParams() {
    return [{ id: "5" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]
}
