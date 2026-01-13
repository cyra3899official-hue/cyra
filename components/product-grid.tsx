"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

type Product = {
  id: number
  name: string
  price: string
  tag?: string
}

const staticProducts = [
  { id: 1, name: "Fruit Serum (សេរ៉ូមផ្លែឈើ)", price: "$14.00", tag: "Whitening" },
  { id: 2, name: "Hydrating Serum (សេរ៉ូមផ្តល់សំណើម)", price: "$14.00", tag: "Hydration" },
  { id: 3, name: "Sunscreen (ឡេការពារកម្ដៅថ្ងៃ)", price: "$14.00", tag: "Protection" },
  { id: 4, name: "Repair Night Cream (ឡេយប់ជួសជុលស្បែក)", price: "$23.00", tag: "Anti-Aging" },
  { id: 5, name: "Melasma Night Cream (ឡេយប់ព្យាបាលជាំ)", price: "$17.00", tag: "Treatment" },
  { id: 6, name: "Freckle Night Cream (ឡេយប់ព្យាបាលអាចម៍រុយ)", price: "$17.00", tag: "Treatment" },
  { id: 7, name: "Acne Night Cream (ឡេយប់កំចាត់មុន)", price: "$17.00", tag: "Acne Care" },
  { id: 8, name: "Acne Serum (សេរ៉ូមព្យាបាលមុន)", price: "$14.00", tag: "Acne Care" },
  { id: 9, name: "Kiwi Mask (ម៉ាសគីវី)", price: "$13.00", tag: "Detox" },
  { id: 10, name: "Strawberry Mask (ម៉ាសស្ត្របឺរី)", price: "$13.00", tag: "Brightening" },
  { id: 11, name: "Coffee Mask (ម៉ាសកាហ្វេ)", price: "$13.00", tag: "Deep Clean" },
  { id: 12, name: "Blue Armpit Cream (ឡេក្លៀកប្រអប់ខៀវ)", price: "$9.00", tag: "Body Care" },
  { id: 13, name: "Pink Armpit Cream (ឡេក្លៀកប្រអប់ផ្កាឈូក)", price: "$9.00", tag: "Intimate Care" },
  { id: 14, name: "Night Body Lotion (ឡេខ្លួនយប់)", price: "$23.00", tag: "Body Care" },
  { id: 15, name: "Day Body Lotion (ឡេខ្លួនថ្ងៃ)", price: "$23.00", tag: "Protection" },
  { id: 16, name: "Yoni Steam Silver (ប្រអប់ប្រាក់)", price: "$13.00", tag: "Wellness" },
  { id: 17, name: "Yoni Steam Platinum (ប្រអប់ផ្លាទីន)", price: "$16.00", tag: "Wellness" },
  { id: 18, name: "Yoni Steam Gold (ប្រអប់មាស)", price: "$19.00", tag: "Wellness" },
  { id: 19, name: "Freckle Set 3in1 (ឈុតកំចាត់អាចម៍រុយ)", price: "$42.00", tag: "Best Seller" },
  { id: 20, name: "Acne Set 3in1 (ឈុតកំចាត់មុន)", price: "$42.00", tag: "Best Seller" },
]

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
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
            price: `$${priceNum.toFixed(2)}`,
            tag: String(raw.category ?? "Product"),
          } as Product
        })
        setProducts(data.length > 0 ? data : staticProducts)
      } catch (error) {
        console.warn("Firestore fetch failed, using static products", error)
        setProducts(staticProducts)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">Loading…</div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-3">Premium Skincare Collection</h2>
          <p className="text-muted-foreground">20 carefully curated products for every skin concern</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white hover:shadow-lg transition-all duration-300 overflow-hidden border border-border"
            >
              <div className="bg-secondary aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-muted-foreground text-4xl">✨</div>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                  {product.tag}
                </span>
                <h3 className="font-medium text-foreground text-sm leading-snug mb-3 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">{product.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg p-2 h-auto"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}