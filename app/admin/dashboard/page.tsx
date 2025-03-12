"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isAuthenticated } from "@/lib/auth"
import { getOrders } from "@/lib/orders"
import type { Order } from "@/lib/types"
import AdminOrdersTable from "@/components/admin-orders-table"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()

      if (!authenticated) {
        router.push("/admin")
        return
      }

      try {
        const ordersData = await getOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-8 bg-muted rounded w-1/4 mt-8"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  // Calculate dashboard stats
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const totalCustomers = new Set(orders.map((order) => order.customer.email)).size

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => router.push("/")}>
          View Store
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+18.7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        <TabsContent value="all" className="mt-4">
          <AdminOrdersTable orders={orders} />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <AdminOrdersTable orders={orders.filter((order) => order.status === "pending")} />
        </TabsContent>

        <TabsContent value="shipped" className="mt-4">
          <AdminOrdersTable orders={orders.filter((order) => order.status === "shipped")} />
        </TabsContent>

        <TabsContent value="delivered" className="mt-4">
          <AdminOrdersTable orders={orders.filter((order) => order.status === "delivered")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

