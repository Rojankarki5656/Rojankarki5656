"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getOrderById } from "@/lib/orders"
import type { Order } from "@/lib/types"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return

      try {
        console.log(orderId); // ✅ Logging before fetching
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
        console.log("Fetched order:", orderData) // ✅ Now logging after fetching
      } catch (error) {
        console.error("Failed to fetch order:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded w-1/3 mx-auto"></div>
          <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="h-6 bg-muted rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  // ✅ Move parsing inside the component, after `order` is set
  const parsedItems = order.items ? JSON.parse(order.items) : [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mb-4">Your order has been received and is now being processed.</p>
        <div className="bg-muted p-4 rounded-md inline-block">
          <p className="font-medium">Order Number: #{order.id}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto border rounded-lg overflow-hidden">
        <div className="bg-muted p-6">
          <h2 className="text-xl font-bold">Order Details</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <address className="not-italic text-muted-foreground">
                {order.customer.firstName} {order.customer.lastName}
                <br />
                {order.customer.address}
                <br />
                {order.customer.city}, {order.customer.state} {order.customer.postalCode}
                <br />
                {order.customer.country}
                <br />
                {order.customer.email}
                <br />
                {order.customer.phone}
              </address>
            </div>

            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Status:</span>
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Items</h3>
            <div className="space-y-4">
              {Array.isArray(parsedItems) ? (
                parsedItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b pb-4">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No items found in this order.</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-muted-foreground mb-6">
          We've sent a confirmation email to {order.customer.email} with your order details.
        </p>
        <Button asChild>
          <Link href="/shop">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  )
}
