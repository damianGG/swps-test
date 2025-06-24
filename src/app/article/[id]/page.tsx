import ArticleViewer from "@/components/article-viewer";


export default function ArticlePage({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen bg-background">
            <ArticleViewer articleId={params.id} />
        </main>
    )
}
