"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button variant="outline" size="icon" onClick={increaseQuantity}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>

      <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}

