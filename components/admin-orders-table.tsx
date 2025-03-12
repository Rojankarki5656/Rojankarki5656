"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreHorizontal, Pencil } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"
import { updateOrderStatus } from "@/lib/orders"
import { useToast } from "@/hooks/use-toast"

export default function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<string>("")

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return

    setIsUpdating(true)

    try {
      await updateOrderStatus(selectedOrder.id, newStatus)

      toast({
        title: "Status updated",
        description: `Order #${selectedOrder.id} status updated to ${newStatus}`,
      })

      // Refresh the page to get updated data
      router.refresh()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to update order status:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating the order status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">No orders found</h3>
        <p className="text-muted-foreground mt-2">There are no orders to display</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  {order.customer.firstName} {order.customer.lastName}
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedOrder(order)
                          setNewStatus(order.status)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Update status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-medium mb-2">Customer Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium text-foreground">Name:</span> {selectedOrder.customer.firstName}{" "}
                    {selectedOrder.customer.lastName}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Email:</span> {selectedOrder.customer.email}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Phone:</span> {selectedOrder.customer.phone}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Address:</span> {selectedOrder.customer.address},{" "}
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.postalCode},{" "}
                    {selectedOrder.customer.country}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium text-foreground">Date:</span>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Status:</span>{" "}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : selectedOrder.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Payment Method:</span>{" "}
                    {selectedOrder.paymentMethod?.toUpperCase() || "UNKNOWN"}
                  </p>
                  <div className="pt-2">
                    <span className="font-medium text-foreground">Update Status:</span>
                    <div className="flex gap-2 mt-1">
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleUpdateStatus} disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-4">Order Items</h3>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-right space-y-1">
                <div className="flex justify-end">
                  <span className="w-32 text-muted-foreground">Subtotal:</span>
                  <span className="w-24">${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-end">
                  <span className="w-32 text-muted-foreground">Shipping:</span>
                  <span className="w-24">$0.00</span>
                </div>
                <div className="flex justify-end font-medium text-lg">
                  <span className="w-32">Total:</span>
                  <span className="w-24">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

