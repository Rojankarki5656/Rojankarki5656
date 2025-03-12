"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { getRelatedProducts } from "@/lib/products"

export default function RelatedProducts({ productId }: { productId: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const relatedProducts = await getRelatedProducts(productId)
        setProducts(relatedProducts)
      } catch (error) {
        console.error("Failed to load related products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [productId])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return <div>No related products found.</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-1 truncate">{product.name}</h3>
            <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/shop/${product.id}`}>View</Link>
            </Button>
            <Button size="icon" onClick={() => addItem(product, 1)} title="Add to Cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to Cart</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

