"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { categories } from "@/lib/products"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
}

export function SearchFilterBar({ onSearch, onCategoryChange }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <div className="bg-white border-b border-border sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg blur pointer-events-none"></div>
          <div className="relative flex items-center gap-3 bg-secondary/50 backdrop-blur-md border border-primary/20 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
              className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
            <Filter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="whitespace-nowrap px-4 py-2 rounded-full border border-border text-sm font-medium transition hover:border-primary hover:text-primary"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
