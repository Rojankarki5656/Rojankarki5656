"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { getFeaturedProducts } from "@/lib/products"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Failed to load featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/shop/${product.id}`}>View Details</Link>
              </Button>
              <Button size="icon" onClick={() => addItem(product, 1)} title="Add to Cart">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to Cart</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/shop">
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

