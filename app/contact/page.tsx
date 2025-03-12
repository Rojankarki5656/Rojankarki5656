"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { sendContactMessage } from "@/lib/contact"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendContactMessage(formData)

      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          Have questions about our products or services? Get in touch with us and we'll be happy to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-32"
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6">
    {/* Location */}
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <MapPin className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-lg">Our Location</h3>
        <address className="not-italic text-muted-foreground">
          P963+QW7, Kathmandu 44600  
          <br />
          Nepal
        </address>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Mail className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-lg">Email Us</h3>
        <p className="text-muted-foreground">
          <a href="mailto:info@stringartnepal.com" className="hover:text-primary">
            info@stringartnepal.com
          </a>
        </p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Phone className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-lg">Call Us</h3>
        <p className="text-muted-foreground">
          <a href="tel:+9779812345678" className="hover:text-primary">
            +977 9812345678
          </a>
        </p>
      </div>
    </div>

    {/* Instagram */}
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Instagram className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-lg">Follow Us</h3>
        <p className="text-muted-foreground">
          <a 
            href="https://www.instagram.com/threads_nails_art_nepal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            @threads_nails_art_nepal
          </a>
        </p>
      </div>
    </div>
  </div>

          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Business Hours</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="rounded-lg overflow-hidden h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4261092430475!2d85.3235645!3d27.7124661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fd7d88f2df%3A0x2e50306d9a76013!2sP963%2BQW7%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1710245678901!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

