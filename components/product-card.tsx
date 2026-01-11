"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  onQuickView?: () => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { language, t } = useLanguage()
  const { addToCart, isLoading } = useCart()
  const [adding, setAdding] = useState(false)

  const name = language === "en" ? product.name_en : product.name_km
  const description = language === "en" ? product.description_en : product.description_km
  const imageUrl = product.image_url || product.product_images?.[0]?.image_url || "/skincare-product-display.png"
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setAdding(true)
    await addToCart(product.id, 1)
    setAdding(false)
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden transition-all hover:shadow-[0_8px_24px_rgba(124,58,237,0.08)] border-gray-200 h-full flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {discount > 0 && (
              <Badge
                className="absolute top-2 right-2 text-white font-bold"
                style={{ backgroundColor: "var(--color-primary-pink)" }}
              >
                -{discount}%
              </Badge>
            )}
            {product.is_featured && (
              <Badge
                className="absolute top-2 left-2 text-white font-bold text-xs"
                style={{ backgroundColor: "var(--color-active-purple)" }}
              >
                {t("Clinical", "គ្លីនិក")}
              </Badge>
            )}

            {/* Quick View Button - Shows on hover */}
            {onQuickView && (
              <Button
                size="sm"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  onQuickView()
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                {t("Quick View", "មើលរហ័ស")}
              </Button>
            )}
          </div>
        </Link>

        <CardContent className="p-4 flex-1 flex flex-col">
          <Link href={`/products/${product.slug}`}>
            <h3
              className="line-clamp-2 text-sm font-bold leading-tight transition-colors hover:opacity-80 min-h-[2.5rem]"
              style={{ color: "var(--color-primary-pink)" }}
            >
              {name}
            </h3>
          </Link>

          {description && <p className="mt-2 text-xs text-gray-600 line-clamp-2">{description}</p>}

          <div className="mt-auto pt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-black">${product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-gray-500 line-through">${product.compare_at_price.toFixed(2)}</span>
            )}
          </div>

          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <p className="mt-1 text-xs font-medium" style={{ color: "var(--color-primary-pink)" }}>
              {t(`Only ${product.stock_quantity} left`, `នៅសល់តែ ${product.stock_quantity}`)}
            </p>
          )}
          {product.stock_quantity === 0 && <p className="mt-1 text-xs text-red-600">{t("Out of stock", "អស់ពីស្តុក")}</p>}
        </CardContent>

        <CardFooter className="gap-2 p-4 pt-0">
          <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full font-bold text-white rounded-lg transition-all"
              style={{ backgroundColor: adding ? "var(--color-active-purple)" : "var(--color-primary-pink)" }}
              disabled={product.stock_quantity === 0 || isLoading || adding}
              onClick={handleAddToCart}
              size="sm"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {adding ? t("Adding...", "កំពុងបន្ថែម...") : t("Add", "បន្ថែម")}
            </Button>
          </motion.div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg transition-colors bg-transparent h-9 w-9"
            style={{ borderColor: "var(--color-primary-pink)", color: "var(--color-primary-pink)" }}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">{t("Add to wishlist", "បញ្ចូលទៅបញ្ជីចង់បាន")}</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
