"use client"

import { useState } from "react"
import { ShopHero } from "@/components/shop/shop-hero"
import { SearchFilterBar } from "@/components/shop/search-filter-bar"
import { FirestoreProductGrid } from "@/components/shop/product-grid-firestore"
import { FloatingChatbot } from "@/components/floating-chatbot"

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <main className="bg-white">
      <ShopHero />
      <SearchFilterBar onSearch={setSearchQuery} onCategoryChange={setSelectedCategory} />
      <FirestoreProductGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <FloatingChatbot />
    </main>
  )
}
