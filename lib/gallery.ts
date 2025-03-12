import type { GalleryImage } from "./types"

// Mock data for gallery images
const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "/placeholder.jpg?height=800&width=800",
    title: "Amoung Us",
    description: "A stunning mountain landscape created with intricate string art techniques.",
  },
  {
    id: "2",
    url: "/art1.jpg?height=800&width=800",
    title: "Mandala Design",
    description: "Colorful mandala pattern showcasing the precision of Nepalese artisans.",
  },
  {
    id: "3",
    url: "/art2.jpg?height=800&width=800",
    title: "Buddha Silhouette",
    description: "Peaceful Buddha silhouette against a vibrant background.",
  },
  {
    id: "4",
    url: "/placeholder.svg?height=800&width=800",
    title: "Heart Design",
    description: "Romantic heart design perfect for gifts and home decor.",
  },
  {
    id: "5",
    url: "/placeholder.svg?height=800&width=800",
    title: "World Map",
    description: "Detailed world map showcasing continents and major landmasses.",
  },
  {
    id: "6",
    url: "/placeholder.svg?height=800&width=800",
    title: "Tree of Life",
    description: "Symbolic tree of life representing growth and connection.",
  },
  
]

// Get all gallery images
export async function getGalleryImages(): Promise<GalleryImage[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return galleryImages
}

