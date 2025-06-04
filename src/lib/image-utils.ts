export function parseImageUrl(imageUrl: string): string {
  if (!imageUrl) return ""

  // Split by # to remove joomlaImage part
  const cleanUrl = imageUrl.split("#")[0]

  // Check if URL is already absolute
  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl
  }

  // If it's a relative path, add the domain
  if (cleanUrl.startsWith("/")) {
    return `https://test-www0.swps.pl${cleanUrl}`
  }

  // If it doesn't start with /, add both domain and slash
  return `https://test-www0.swps.pl/${cleanUrl}`
}
