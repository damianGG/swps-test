"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, User, Eye, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface ArticleImages {
    image_intro: string
    image_intro_alt: string
    image_intro_caption: string
    image_fulltext: string
    image_fulltext_alt: string
    image_fulltext_caption: string
    float_fulltext: string
}

interface CustomImage {
    field4: {
        imagefile: string
        alt_text: string
    }
    field8: string
    field9: string
}

interface ArticleData {
    id: string
    attributes: {
        title: string
        created: string
        modified: string
        text: string
        hits: number
        images: ArticleImages
        tags: Record<string, string>
        "about-the-author": string
        obrazy: string
    }
}

interface ApiResponse {
    data: ArticleData
}

interface ArticleViewerProps {
    articleId?: string
}

export default function ArticleViewer({ articleId = "5" }: ArticleViewerProps) {
    const [article, setArticle] = useState<ArticleData | null>(null)
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

    const parseCustomImages = (obrazyString: string): CustomImage[] => {
        try {
            const parsed = JSON.parse(obrazyString)
            return Object.values(parsed) as CustomImage[]
        } catch {
            return []
        }
    }

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/article?id=${articleId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data: ApiResponse = await response.json()
                setArticle(data.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Wystąpił błąd podczas pobierania artykułu")
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
    }, [articleId])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-32 w-full" />
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

    if (!article) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="p-6">
                        <p>Nie znaleziono artykułu</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const customImages = parseCustomImages(article.attributes.obrazy || "{}")

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Powrót do listy
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{article.attributes.title}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Utworzono: {new Date(article.attributes.created).toLocaleDateString("pl-PL")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>Wyświetlenia: {article.attributes.hits}</span>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {article.attributes.images?.image_intro && (
                <Card>
                    <CardContent className="p-0">
                        <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg">
                            <Image
                                src={extractImageUrl(article.attributes.images.image_intro) || "/placeholder.svg"}
                                alt={article.attributes.images.image_intro_alt || "Obrazek wprowadzający"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {article.attributes.images.image_intro_caption && (
                            <p className="p-4 text-sm text-muted-foreground text-center">
                                {article.attributes.images.image_intro_caption}
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="p-6">
                    <div
                        className="prose prose-gray max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: article.attributes.text }}
                    />
                </CardContent>
            </Card>

            {article.attributes.images?.image_fulltext && (
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div className="relative w-full md:w-96 aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src={extractImageUrl(article.attributes.images.image_fulltext) || "/placeholder.svg"}
                                    alt={article.attributes.images.image_fulltext_alt || "Obrazek pełnotekstowy"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {article.attributes.images.image_fulltext_caption && (
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground">{article.attributes.images.image_fulltext_caption}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {customImages.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Galeria obrazów</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {customImages.map((img, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="relative aspect-video overflow-hidden rounded-lg">
                                        <Image
                                            src={extractImageUrl(img.field4.imagefile) || "/placeholder.svg"}
                                            alt={img.field4.alt_text || `Obraz ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {img.field8 && <p className="text-sm text-muted-foreground text-center">{img.field8}</p>}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {article.attributes.tags && Object.keys(article.attributes.tags).length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Tagi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(article.attributes.tags).map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {article.attributes["about-the-author"] && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="w-5 h-5" />O autorze
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{article.attributes["about-the-author"]}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
