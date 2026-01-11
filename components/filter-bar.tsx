"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Category } from "@/lib/types"

interface FilterBarProps {
  categories: Category[]
  selectedCategory: string
  minPrice: string
  maxPrice: string
  onCategoryChange: (categoryId: string) => void
  onPriceChange: (min: string, max: string) => void
  onClearFilters: () => void
}

export function FilterBar({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
}: FilterBarProps) {
  const { language, t } = useLanguage()
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice ? Number.parseFloat(minPrice) : 0,
    maxPrice ? Number.parseFloat(maxPrice) : 200,
  ])

  const hasActiveFilters = selectedCategory || minPrice || maxPrice

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  const applyPriceFilter = () => {
    onPriceChange(priceRange[0].toString(), priceRange[1].toString())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-primary-pink)" }}>
          {t("Filters", "តម្រង")}
        </h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-0 text-xs">
            {t("Clear all", "លុបទាំងអស់")}
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{t("Categories", "ប្រភេទ")}</Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const name = language === "en" ? cat.name_en : cat.name_km
            const isSelected = selectedCategory === cat.id
            return (
              <Badge
                key={cat.id}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                style={
                  isSelected
                    ? {
                        backgroundColor: "var(--color-primary-pink)",
                        color: "white",
                      }
                    : {
                        borderColor: "var(--color-primary-pink)",
                        color: "var(--color-primary-pink)",
                      }
                }
                onClick={() => onCategoryChange(isSelected ? "" : cat.id)}
              >
                {name}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{t("Price Range", "ចន្លោះតម្លៃ")}</Label>
        <div className="px-2 py-4">
          <Slider min={0} max={200} step={5} value={priceRange} onValueChange={handlePriceChange} className="mb-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">${priceRange[0]}</span>
            <span className="text-gray-600">${priceRange[1]}</span>
          </div>
        </div>
        <Button
          className="w-full"
          size="sm"
          style={{ backgroundColor: "var(--color-primary-pink)", color: "white" }}
          onClick={applyPriceFilter}
        >
          {t("Apply", "អនុវត្ត")}
        </Button>
      </div>
    </div>
  )
}
