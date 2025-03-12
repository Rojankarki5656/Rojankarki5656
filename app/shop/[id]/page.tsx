import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/lib/products"
import AddToCartButton from "@/components/add-to-cart-button"
import RelatedProducts from "@/components/related-products"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md border cursor-pointer">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Size:</span>
              <span>{product.size}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Material:</span>
              <span>{product.material}</span>
            </div>
            {product.inStock ? (
              <div className="text-green-600 font-medium">In Stock</div>
            ) : (
              <div className="text-red-600 font-medium">Out of Stock</div>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Product Details</h3>
              <p>{product.details}</p>
              <ul>
                <li>Handcrafted in Nepal</li>
                <li>Made with premium materials</li>
                <li>Each piece is unique</li>
                <li>Comes with hanging hardware</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Shipping Information</h3>
              <p>We ship worldwide from our workshop in Kathmandu, Nepal.</p>
              <ul>
                <li>Nepal: 1-3 business days</li>
                <li>India: 3-5 business days</li>
                <li>Rest of Asia: 5-7 business days</li>
                <li>Europe & North America: 7-14 business days</li>
                <li>Rest of World: 10-21 business days</li>
              </ul>
              <p>All orders are carefully packaged to ensure safe delivery.</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review, i) => (
                    <div key={i} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts productId={product.id} />
        </Suspense>
      </div>
    </div>
  )
}

