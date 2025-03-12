import { Gallery } from "@/components/gallery"

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Gallery</h1>
        <p className="text-muted-foreground">
          Explore our collection of handcrafted string art pieces created by skilled Nepalese artisans. Each piece is
          unique and tells a story through intricate patterns and vibrant colors.
        </p>
      </div>

      <Gallery />
    </div>
  )
}

