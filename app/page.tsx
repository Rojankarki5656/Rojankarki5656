import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import { Gallery } from "@/components/gallery"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-black/70 to-black/40 absolute z-10" />
          <img
            src="/threadsart.jpg?height=1080&width=1920"
            alt="String Art Nepal Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Handcrafted String Art from Nepal</h1>
            <p className="text-lg md:text-xl mb-8">
              Unique decorative pieces made with love and precision by skilled Nepalese artisans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                asChild
              >
                <Link href="/gallery">
                  View Gallery <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Artworks</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Gallery</h2>
            <Button variant="outline" asChild>
              <Link href="/gallery">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Gallery limit={6} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About String Art Nepal</h2>
              <p className="mb-4">
                String Art Nepal specializes in creating beautiful, handcrafted string art pieces that add a unique
                touch to any space. Each piece is meticulously crafted by skilled artisans in Nepal.
              </p>
              <p className="mb-6">
                Our mission is to showcase the incredible talent of Nepalese artisans while providing our customers with
                one-of-a-kind decorative pieces that tell a story.
              </p>
              <Button asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/placeholder.svg?height=600&width=800" alt="Artisan at work" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

