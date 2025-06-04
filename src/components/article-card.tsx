import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Eye, Star } from "lucide-react"
import { parseImageUrl } from "@/lib/image-utils"
import { stripHtmlAndTruncate, formatDate } from "@/lib/text-utils"

interface ArticleCardProps {
  article: {
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
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { attributes } = article
  const imageUrl = attributes.images.image_intro ? parseImageUrl(attributes.images.image_intro) : null
  const excerpt = stripHtmlAndTruncate(attributes.text, 120)

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/article/${article.id}`} className="block h-full">
        <CardHeader className="p-0">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={attributes.images.image_intro_alt || attributes.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="text-sm">Brak obrazu</div>
                </div>
              </div>
            )}

            {/* Featured badge */}
            {attributes.featured === 1 && (
              <div className="absolute top-3 left-3">
                <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="h-3 w-3 mr-1" />
                  Wyróżniony
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {attributes.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{excerpt}</p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              <span>{formatDate(attributes.created)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{attributes.hits}</span>
            </div>
          </div>

          {/* Tags */}
          {Object.keys(attributes.tags).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {Object.entries(attributes.tags)
                .slice(0, 3)
                .map(([id, name]) => (
                  <Badge key={id} variant="secondary" className="text-xs">
                    {name}
                  </Badge>
                ))}
              {Object.keys(attributes.tags).length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{Object.keys(attributes.tags).length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
