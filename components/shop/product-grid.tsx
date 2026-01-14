"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { products } from "@/lib/products"

interface ProductGridProps {
  searchQuery: string
  selectedCategory: string
}

export function ProductGrid({ searchQuery, selectedCategory }: ProductGridProps) {
  const [addedItems, setAddedItems] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.benefit.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" ||
        selectedCategory === "best-sellers" ||
        product.category.toLowerCase().replace(" ", "-") === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (id: number) => {
    setAddedItems([...addedItems, id])
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((item) => item !== id))
    }, 1000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground">
          {selectedCategory === "all" ? "All Products" : "Shop"}
        </h2>
        <p className="text-muted-foreground mt-2">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
