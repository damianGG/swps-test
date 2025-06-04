import { Badge } from "@/components/ui/badge"

interface ArticleTagsProps {
  tags: Record<string, string>
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  const tagEntries = Object.entries(tags)

  if (tagEntries.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tagEntries.map(([id, name]) => (
        <Badge key={id} variant="secondary">
          {name}
        </Badge>
      ))}
    </div>
  )
}
