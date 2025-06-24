"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface ArticlePreview {
    id: string
    attributes: {
        title: string
        alias: string
        created: string
        hits: number
        images: {
            image_intro: string
            image_intro_alt: string
        }
        tags?: Record<string, string>
    }
}

interface ApiResponse {
    data: ArticlePreview[]
    meta?: {
        total: number
        pageCount: number
        current: number
    }
}

export default function ArticlesList() {
    const [articles, setArticles] = useState<ArticlePreview[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const extractImageUrl = (imageString: string): string => {
        // Wyciąga URL obrazu z formatu Joomla
        const match = imageString?.match(/^([^#]+)/)
        let imageUrl = match ? match[1] : imageString || ""

        // Jeśli URL nie zaczyna się od http/https, dodaj bazowy URL
        if (imageUrl && !imageUrl.startsWith("http")) {
            // Usuń początkowy slash jeśli istnieje
            imageUrl = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl
            imageUrl = `https://test-www0.swps.pl/${imageUrl}`
        }

        return imageUrl
    }

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("/api/articles", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data: ApiResponse = await response.json()
                setArticles(data.data || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : "Wystąpił błąd podczas pobierania artykułów")
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                        <div className="h-48 bg-muted" />
                        <CardHeader>
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardFooter>
                            <Skeleton className="h-10 w-28" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Card className="border-red-200">
                    <CardContent className="p-6">
                        <p className="text-red-600">Błąd: {error}</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!articles.length) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">Nie znaleziono artykułów</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">Artykuły</h1>
            <div className="space-y-6">
                {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {article.attributes.images?.image_intro && (
                                <div className="relative h-48 md:h-full">
                                    <Image
                                        src={extractImageUrl(article.attributes.images.image_intro) || "/placeholder.svg"}
                                        alt={article.attributes.images.image_intro_alt || article.attributes.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="md:col-span-2 p-6">
                                <CardHeader className="p-0 pb-4">
                                    <CardTitle className="text-xl font-bold">{article.attributes.title}</CardTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(article.attributes.created).toLocaleDateString("pl-PL")}</span>
                                    </div>
                                </CardHeader>
                                <CardFooter className="p-0 pt-4 flex justify-between items-center">
                                    <div className="flex flex-wrap gap-2">
                                        {article.attributes.tags &&
                                            Object.values(article.attributes.tags)
                                                .slice(0, 3)
                                                .map((tag, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                    </div>
                                    <Link href={`/article/${article.id}`}>
                                        <Button>
                                            Czytaj więcej
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
