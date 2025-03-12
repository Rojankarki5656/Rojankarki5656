"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { getCategories } from "@/lib/products"

type ProductFiltersProps = {
  className?: string
}

export default function ProductFilters({ className }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Get current filter values from URL
  useEffect(() => {
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    if (category) {
      setSelectedCategories([category])
    }

    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)])
    }

    // Load categories
    const loadCategories = async () => {
      try {
        const allCategories = await getCategories()
        setCategories(allCategories)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }

    loadCategories()
  }, [searchParams])

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0])
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/shop?${params.toString()}`)
  }

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    router.push("/shop")
  }

  // Handle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([category])
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>

        <Collapsible defaultOpen className="space-y-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Categories
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen className="space-y-4 mt-6">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
            Price Range
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-2">
            <Slider
              defaultValue={priceRange}
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="py-4"
            />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-col gap-2 mt-8">
          <Button onClick={applyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

