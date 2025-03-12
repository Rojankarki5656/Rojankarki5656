import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { getProducts } from "@/lib/products"
import { useSearchParams } from "next/navigation"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const searchParams = useSearchParams()

  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const allProducts = await getProducts()

        // Apply filters
        let filteredProducts = allProducts

        if (category) {
          filteredProducts = filteredProducts.filter((p) => p.category === category)
        }

        if (minPrice) {
          filteredProducts = filteredProducts.filter((p) => p.price >= Number(minPrice))
        }

        if (maxPrice) {
          filteredProducts = filteredProducts.filter((p) => p.price <= Number(maxPrice))
        }

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category, minPrice, maxPrice])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded-md"></div>
            <div className="mt-2 h-4 bg-muted rounded w-3/4"></div>
            <div className="mt-1 h-4 bg-muted rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                New
              </div>
            )}
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
  )
}

