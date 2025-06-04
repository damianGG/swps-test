"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Eye, User } from "lucide-react"
import type { JoomlaArticle } from "@/lib/joomla-api"
import { ImageGallery } from "./image-gallery"
import { ArticleTags } from "./article-tags"

interface JoomlaArticleProps {
  articleId: string
}

export function JoomlaArticleComponent({ articleId }: JoomlaArticleProps) {
  const [article, setArticle] = useState<JoomlaArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true)
        const res = await fetch(`/api/articles/${articleId}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: JoomlaArticle = await res.json()
        setArticle(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił błąd podczas ładowania artykułu")
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [articleId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <h2 className="text-xl font-semibold mb-2">Błąd ładowania artykułu</h2>
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!article) return null

  const { attributes } = article.data

  // Extract clean image URLs
  const introImageUrl = attributes.images.image_intro ? attributes.images.image_intro.split("#")[0] : null
  const fulltextImageUrl = attributes.images.image_fulltext ? attributes.images.image_fulltext.split("#")[0] : null

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="space-y-4">
          {/* Hero Image */}
          {introImageUrl && (
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={`https://test-www0.swps.pl/${introImageUrl}`}
                alt={attributes.images.image_intro_alt || attributes.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title and Meta */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{attributes.title}</h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(attributes.created).toLocaleDateString("pl-PL")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{attributes.hits} wyświetleń</span>
              </div>
              {attributes.featured === 1 && <Badge variant="default">Wyróżniony</Badge>}
            </div>

            {/* Tags */}
            <ArticleTags tags={attributes.tags} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {/* Fulltext Image */}
            {fulltextImageUrl && (
              <div
                className={`relative mb-6 ${
                  attributes.images.float_fulltext === "float-start" ? "float-left mr-4 mb-4" : ""
                }`}
              >
                <div className="relative h-48 w-64 rounded-lg overflow-hidden">
                  <Image
                    src={`https://test-www0.swps.pl/${fulltextImageUrl}`}
                    alt={attributes.images.image_fulltext_alt || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                {attributes.images.image_fulltext_caption && (
                  <p className="text-xs text-gray-500 mt-1 text-center">{attributes.images.image_fulltext_caption}</p>
                )}
              </div>
            )}

            {/* Article Text */}
            <div dangerouslySetInnerHTML={{ __html: attributes.text }} className="prose prose-lg max-w-none" />
          </div>

          {/* About Author */}
          {attributes["about-the-author"] && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  <h3 className="font-semibold">O autorze</h3>
                </div>
                <p className="text-gray-700">{attributes["about-the-author"]}</p>
              </CardContent>
            </Card>
          )}

          {/* Test Lista */}
          {attributes.testlista && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Lista testowa</h3>
                <div className="space-y-2">
                  {Object.entries(attributes.testlista).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Gallery */}
          {attributes.obrazy && <ImageGallery obrazyData={attributes.obrazy} />}

          {/* Gallery Info */}
          {attributes.galeria && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Informacje o galerii</h3>
                <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                  {JSON.stringify(JSON.parse(attributes.galeria), null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
