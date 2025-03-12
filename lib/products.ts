import type { Product } from "./types"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Mountain Landscape String Art",
    description: "A beautiful mountain landscape crafted with precision using high-quality string and wood.",
    details:
      "This mountain landscape string art piece is handcrafted by skilled artisans in Nepal. The intricate design captures the majestic beauty of the Himalayan mountains. Each piece is unique and may vary slightly from the image shown.",
    price: 89.99,
    images: [
      "/placeholder.jpg?height=600&width=600",
      "/placeholder.jpg?height=600&width=600",
      "/placeholder.jpg?height=600&width=600",
      "/placeholder.jpg?height=600&width=600",
    ],
    category: "Landscapes",
    size: '16" x 12"',
    material: "Pine wood, cotton string",
    inStock: true,
    isFeatured: true,
    reviews: [
      {
        name: "John D.",
        rating: 5,
        comment: "Absolutely stunning piece! The craftsmanship is exceptional.",
        date: "2023-12-15",
      },
      {
        name: "Sarah M.",
        rating: 4,
        comment: "Beautiful artwork. Looks great in my living room.",
        date: "2023-11-20",
      },
    ],
  },
  {
    id: "2",
    name: "Mandala String Art",
    description: "Intricate mandala pattern created with colorful strings on a circular wooden base.",
    details:
      "This mandala string art is a mesmerizing piece that brings positive energy to any space. The intricate pattern is created using vibrant colored strings on a circular wooden base. Each piece is handcrafted with attention to detail by our skilled artisans.",
    price: 69.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Mandalas",
    size: '12" diameter',
    material: "Teak wood, cotton string",
    inStock: true,
    isFeatured: true,
    reviews: [
      {
        name: "Emily R.",
        rating: 5,
        comment: "The colors are vibrant and the pattern is mesmerizing!",
        date: "2023-12-05",
      },
    ],
  },
  {
    id: "3",
    name: "Buddha Silhouette String Art",
    description: "Peaceful Buddha silhouette created with string art technique on dark wood.",
    details:
      "This Buddha silhouette string art brings a sense of peace and tranquility to any space. The contrast between the dark wood and light-colored string creates a striking visual effect. Each piece is handcrafted with reverence and attention to detail.",
    price: 79.99,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "Spiritual",
    size: '14" x 18"',
    material: "Walnut wood, silk string",
    inStock: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "4",
    name: "Heart String Art",
    description: "Romantic heart design perfect as a gift for loved ones.",
    details:
      "This heart string art piece makes a perfect gift for anniversaries, weddings, or to show someone special how much you care. The vibrant red strings create a striking contrast against the light wood background.",
    price: 49.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "Love & Romance",
    size: '10" x 10"',
    material: "Pine wood, cotton string",
    inStock: true,
    isFeatured: true,
    reviews: [
      {
        name: "Michael T.",
        rating: 5,
        comment: "Gave this to my wife for our anniversary and she loved it!",
        date: "2023-10-18",
      },
      {
        name: "Jessica L.",
        rating: 4,
        comment: "Beautiful craftsmanship. Slightly smaller than I expected.",
        date: "2023-11-02",
      },
    ],
  },
  {
    id: "5",
    name: "World Map String Art",
    description: "Detailed world map created with string art on a wooden board.",
    details:
      "This world map string art is perfect for travel enthusiasts and geography lovers. The intricate design showcases continents and major landmasses with precision. Each piece is handcrafted with attention to geographical accuracy.",
    price: 129.99,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    category: "Maps",
    size: '24" x 18"',
    material: "Oak wood, nylon string",
    inStock: false,
    reviews: [],
  },
  {
    id: "6",
    name: "Tree of Life String Art",
    description: "Symbolic tree of life design representing growth and connection.",
    details:
      "The Tree of Life string art symbolizes growth, strength, and the interconnectedness of all living things. This piece features a detailed tree with spreading branches and roots, created using the string art technique on a solid wood base.",
    price: 89.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "Symbolic",
    size: '16" x 16"',
    material: "Cherry wood, cotton string",
    inStock: true,
    isNew: true,
    reviews: [],
  },
  {
    id: "7",
    name: "Lotus Flower String Art",
    description: "Delicate lotus flower design symbolizing purity and enlightenment.",
    details:
      "This lotus flower string art represents purity, enlightenment, and rebirth. The delicate design is created using pastel-colored strings that create a serene and calming effect. Each piece is handcrafted with precision and care.",
    price: 59.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "Flowers",
    size: '12" x 12"',
    material: "Birch wood, silk string",
    inStock: true,
    reviews: [],
  },
  {
    id: "8",
    name: "Elephant String Art",
    description: "Majestic elephant design showcasing Nepalese artistic traditions.",
    details:
      "This elephant string art piece celebrates the majestic animal that holds cultural significance in Nepal. The intricate design captures the elephant's grandeur and strength. Each piece is handcrafted with respect for traditional Nepalese artistic techniques.",
    price: 74.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "Animals",
    size: '14" x 12"',
    material: "Teak wood, cotton string",
    inStock: true,
    reviews: [],
  },
]

// Get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.isFeatured)
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return products.find((product) => product.id === id) || null
}

// Get related products
export async function getRelatedProducts(productId: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const product = products.find((p) => p.id === productId)
  if (!product) return []

  // Get products in the same category, excluding the current product
  return products.filter((p) => p.category === product.category && p.id !== productId).slice(0, 4)
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const categories = new Set(products.map((product) => product.category))
  return Array.from(categories)
}

