import type { Order } from "./types"
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const SupabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SupabaseKey= process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SupabaseURL, SupabaseKey);
// Mock data for orders
export const orders: Order[] = []


// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return data as Order;
}


// Create a new order
export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order | null> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}`;

    // Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId, // Custom order ID
          customer: orderData.customer, // JSONB field
          items: orderData.items, // JSONB field
          subtotal: orderData.subtotal,
          total: orderData.total,
          paymentmethod: orderData.paymentMethod,
          notes: orderData.notes,
          status: orderData.status || "pending", // Default status if empty
          createdat: new Date().toISOString(),
          updatedat: new Date().toISOString(),
        }
      ])
      .select()
      .single(); // Fetch the inserted row

    if (error) throw error;

    console.log("✅ Order Created:", data);

    // Redirect after order is successfully created
    window.location.href = `/checkout/success?orderId=${orderId}`;

    return data;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return null;
  }
}


// Update order status
export async function updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updatedat: new Date().toISOString(), // Ensure lowercase column name
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    return null;
  }

  return data;
}

// Get all orders from Supabase
export async function getOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { data, error } = await supabase
    .from("orders")
    .select("*");

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data || [];
}

