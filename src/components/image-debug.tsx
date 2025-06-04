import { parseImageUrl } from "@/lib/image-utils"

interface ImageDebugProps {
  originalUrl: string
  label: string
}

export function ImageDebug({ originalUrl, label }: ImageDebugProps) {
  const parsedUrl = parseImageUrl(originalUrl)

  return (
    <div className="bg-gray-100 p-3 rounded text-xs font-mono mb-4">
      <p>
        <strong>{label}:</strong>
      </p>
      <p>
        <strong>Original:</strong> {originalUrl}
      </p>
      <p>
        <strong>Parsed:</strong> {parsedUrl}
      </p>
    </div>
  )
}
