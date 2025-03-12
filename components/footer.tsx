import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">String Art Nepal</h3>
            <p className="text-sm text-muted-foreground">
              Handcrafted string art decorations made with love by skilled Nepalese artisans.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="mailto:info@stringartnepal.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-primary">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+977 9812345678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>info@stringartnepal.com</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} String Art Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

