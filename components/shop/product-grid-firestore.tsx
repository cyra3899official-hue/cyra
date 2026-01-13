"use client"

import { useEffect, useMemo, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { ProductCard } from "./product-card"

type Product = {
  id: number
  name: string
  price: number
  image: string
  benefit: string
  category: string
}

interface ProductGridProps {
  searchQuery: string
  selectedCategory: string
}

export function FirestoreProductGrid({ searchQuery, selectedCategory }: ProductGridProps) {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const snap = await getDocs(collection(db, "products"))
        const data = snap.docs.map((d) => {
          const raw = d.data() as any
          const priceNum =
            typeof raw.price === "number"
              ? raw.price
              : parseFloat(String(raw.price ?? "0").replace(/[^0-9.]/g, "")) || 0

          return {
            id: Number(raw.id ?? d.id),
            name: String(raw.name ?? ""),
            benefit: String(raw.benefit ?? raw.description ?? ""),
            image: String(raw.image ?? ""),
            price: priceNum,
            category: String(raw.category ?? ""),
          } as Product
        })
        setItems(data)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const filteredProducts = useMemo(() => {
    return items.filter((product) => {
      const matchesSearch = (
        (product.name + " " + product.benefit).toLowerCase().includes(searchQuery.toLowerCase())
      )

      const matchesCategory =
        selectedCategory === "all" ||
        selectedCategory === "best-sellers" ||
        product.category.toLowerCase().replace(" ", "-") === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [items, searchQuery, selectedCategory])

  const [addedItems, setAddedItems] = useState<number[]>([])
  const handleAddToCart = (id: number) => {
    setAddedItems((prev) => [...prev, id])
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((item) => item !== id))
    }, 1000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="py-12 text-center text-muted-foreground">Loading…</div>
      </div>
    )
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
