"use client";
import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProductGrid from "@/components/product-grid";
import ProductFilters from "@/components/product-filters";

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading Shop...</div>}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shop</h1>
            <p className="text-muted-foreground">Browse our collection of handcrafted string art pieces</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-4">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down your product search</SheetDescription>
              </SheetHeader>
              <ProductFilters className="mt-4" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </Suspense>
  );
}


function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-muted rounded-md"></div>
          <div className="mt-2 h-4 bg-muted rounded w-3/4"></div>
          <div className="mt-1 h-4 bg-muted rounded w-1/4"></div>
        </div>
      ))}
    </div>
  )
}

