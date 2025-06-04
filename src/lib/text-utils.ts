export function stripHtmlAndTruncate(html: string, maxLength = 150): string {
  // Remove HTML tags
  const textOnly = html.replace(/<[^>]*>/g, "")

  // Decode HTML entities
  const decoded = textOnly
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

  // Trim whitespace
  const trimmed = decoded.trim()

  // Truncate if needed
  if (trimmed.length <= maxLength) {
    return trimmed
  }

  // Find the last space before maxLength to avoid cutting words
  const truncated = trimmed.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(" ")

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + "..."
  }

  return truncated + "..."
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
