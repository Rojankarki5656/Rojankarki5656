"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false)
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
        variant: "destructive",
      })
      setCouponCode("")
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4">Product</th>
                  <th className="text-center p-4">Quantity</th>
                  <th className="text-right p-4">Price</th>
                  <th className="text-right p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.product.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="p-4 text-right">${item.product.price.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium">${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.product.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" asChild>
              <Link href="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Taxes calculated at checkout</p>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <Button variant="outline" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode.trim()}>
                {isApplyingCoupon ? "Applying..." : "Apply"}
              </Button>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

