import Image from "next/image"
import { parseImageUrl } from "@/lib/image-utils"

interface GalleryImage {
  field9: string
  field4: {
    imagefile: string
    alt_text: string
  }
  field8: string
}

interface ImageGalleryProps {
  obrazyData: string
}

export function ImageGallery({ obrazyData }: ImageGalleryProps) {
  try {
    const parsedData = JSON.parse(obrazyData)
    const images: GalleryImage[] = Object.values(parsedData)

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Galeria obrazów</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => {
            // Use the parseImageUrl function instead of manual parsing
            const imageUrl = parseImageUrl(image.field4.imagefile)

            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={image.field4.alt_text || `Obraz ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                {image.field8 && (
                  <div className="p-3">
                    <p className="text-sm text-gray-600">{image.field8}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error parsing gallery data:", error)
    return null
  }
}
