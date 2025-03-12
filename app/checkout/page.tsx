"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { createOrder } from "@/lib/orders"
// createOrder.ts


export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nepal",
    notes: "",
    paymentMethod: "cod",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create order
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
      const order = await createOrder({
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: orderItems,
        subtotal,
        total: subtotal, // Add shipping/tax calculation if needed
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        status: ""
      })

      // Clear cart and redirect to success page
      clearCart()
    } catch (error) {
      console.error("Failed to create order:", error)
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">You need to add items to your cart before checking out.</p>
        <Button asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Shop
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Shipping Address</h2>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nepal">Nepal</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special instructions for delivery or any other notes"
                  className="h-24"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Payment Method</h2>

              <div className="space-y-2">
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="khalti">Khalti</SelectItem>
                    <SelectItem value="esewa">eSewa</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cart
                </Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
                {!isSubmitting && <CreditCard className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <div className="flex justify-between text-sm">
                      <span>
                        {item.quantity} × ${item.product.price.toFixed(2)}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t">
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
              <p className="text-sm text-muted-foreground mt-1">Taxes included if applicable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

