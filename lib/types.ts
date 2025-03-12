export type Product = {
  id: string
  name: string
  description: string
  details?: string
  price: number
  images: string[]
  category: string
  size: string
  material: string
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  reviews?: ProductReview[]
}

export type ProductReview = {
  name: string
  rating: number
  comment: string
  date: string
}

export type Order = {
  id: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  items: OrderItem[]
  subtotal: number
  total: number
  status: string
  paymentMethod: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

export type GalleryImage = {
  id: string
  url: string
  title: string
  description?: string
}

