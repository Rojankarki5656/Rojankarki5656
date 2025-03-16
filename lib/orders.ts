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
    .select(`items,
      subtotal,
      total,
      status,
      paymentmethod,
      notes,
      createdat,
      updateat,
      customers:customer_id(*)`)
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return {
    id: id,
    items: data.items,
    subtotal: data.subtotal,
    total: data.total,
    status: data.status,
    paymentMethod: data.paymentmethod,
    notes: data.notes,
    createdAt: data.createdat,
    updatedAt: data.updateat,
    customer: {
      firstName: data.customers.name.split(' ')[0],
      lastName: data.customers.name.split(' ')[1],
      email: data.customers.email,
      phone: data.customers.phone,
      address: data.customers.address,
      city: data.customers.city,
      state: data.customers.state,
      postalCode: data.customers.postalcode,
      country: data.customers.country,
    }
  } as Order;
}


// Create a new order
export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order | null> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Insert new customer into Supabase
    const { data: customerData, error: customerError } = await supabase
      .from("customers")
      .insert([
        {
          name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
          email: orderData.customer.email,
          phone: orderData.customer.phone,
          address: orderData.customer.address,
          city: orderData.customer.city,
          state: orderData.customer.state,
          postalcode: orderData.customer.postalCode,
          country: orderData.customer.country,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (customerError) throw customerError;

    console.log("✅ Customer Created:", customerData);

    // Get the newly inserted customer's ID
    const customerId = customerData.id; // Ensure `id` exists in the `customers` table

    // Generate a unique order ID (if necessary)
    const orderId = `ORD-${Date.now()}`;

    // Insert the order into Supabase
    const { data: orderDataResponse, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId, // Custom order ID
          customer_id: customerId, // Store only customer ID
          items: JSON.stringify(orderData.items), // Convert to JSON string if stored as JSONB
          subtotal: orderData.subtotal,
          total: orderData.total,
          paymentmethod: orderData.paymentMethod, // Ensure this column name is correct
          notes: orderData.notes,
          status: orderData.status || "pending", // Default status
          createdat: new Date().toISOString(),
          updateat: new Date().toISOString(),
        }
      ])
      .select()
      .single(); // Fetch the inserted row

    if (orderError) throw orderError;

    console.log("✅ Order Created:", orderDataResponse);

    // Redirect after order creation
    window.location.href = `/checkout/success?orderId=${orderId}`;

    return orderDataResponse;
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

