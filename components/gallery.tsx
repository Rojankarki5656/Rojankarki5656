"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { getGalleryImages } from "@/lib/gallery"

type GalleryProps = {
  limit?: number
}

type GalleryImage = {
  id: string
  url: string
  title: string
  description?: string
}

export function Gallery({ limit }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const galleryImages = await getGalleryImages()
        setImages(limit ? galleryImages.slice(0, limit) : galleryImages)
      } catch (error) {
        console.error("Failed to load gallery images:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGallery()
  }, [limit])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <div
                className="aspect-square overflow-hidden rounded-md cursor-pointer relative group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <h3 className="text-white font-medium">{image.title}</h3>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogTitle>{image.title}</DialogTitle> {/* ✅ Add this to fix error */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  {image.description && <p className="text-muted-foreground">{image.description}</p>}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  )
}
