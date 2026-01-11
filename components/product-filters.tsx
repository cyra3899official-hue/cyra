"use client"

import { useLanguage } from "@/lib/language-context"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ProductFiltersProps {
  categories: Array<{ id: string; name_en: string; name_km: string }>
  onFilterChange: (filters: any) => void
}

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const { language, t } = useLanguage()

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">{t("Categories", "ប្រភេទ")}</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label htmlFor={category.id} className="text-sm font-normal">
                {language === "en" ? category.name_en : category.name_km}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">{t("Price Range", "ជួរតម្លៃ")}</h3>
        <Slider defaultValue={[0, 1000]} max={1000} step={10} className="mb-2" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">{t("Availability", "ភាពអាចរកបាន")}</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock" className="text-sm font-normal">
              {t("In Stock", "មានក្នុងស្តុក")}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale" className="text-sm font-normal">
              {t("On Sale", "កំពុងបញ្ចុះតម្លៃ")}
            </Label>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent">
        {t("Reset Filters", "កំណត់ឡើងវិញ")}
      </Button>
    </Card>
  )
}
