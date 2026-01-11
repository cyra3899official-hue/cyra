"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { language, t } = useLanguage()
  const { addToCart, isLoading } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  const name = language === "en" ? product.name_en : product.name_km
  const description = language === "en" ? product.description_en : product.description_km
  const images = product.product_images || []
  const currentImage = images[currentImageIndex]?.image_url || "/placeholder.svg"

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const handleAddToCart = async () => {
    setAdding(true)
    await addToCart(product.id, quantity)
    setAdding(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full w-full"
                >
                  <Image src={currentImage || "/placeholder.svg"} alt={name} fill className="object-cover" />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {discount > 0 && (
                <Badge
                  className="absolute top-3 right-3 text-white font-bold"
                  style={{ backgroundColor: "var(--color-primary-pink)" }}
                >
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      idx === currentImageIndex ? "border-pink-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img.image_url || "/placeholder.svg"}
                      alt={`${name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              {product.is_featured && (
                <Badge className="mb-2 text-white" style={{ backgroundColor: "var(--color-active-purple)" }}>
                  {t("Clinically Recommended", "ណែនាំដោយគ្លីនិក")}
                </Badge>
              )}
              <h2 className="text-2xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
                {name}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill={i < 4 ? "var(--color-primary-pink)" : "none"}
                      stroke="var(--color-primary-pink)"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.5)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
                ${product.price.toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-xl text-gray-500 line-through">${product.compare_at_price.toFixed(2)}</span>
              )}
            </div>

            {product.stock_quantity < 10 && product.stock_quantity > 0 && (
              <p className="text-sm font-medium" style={{ color: "var(--color-primary-pink)" }}>
                {t(`Only ${product.stock_quantity} left in stock`, `នៅសល់តែ ${product.stock_quantity} នៅក្នុងស្តុក`)}
              </p>
            )}

            {description && (
              <div>
                <h3 className="mb-2 font-semibold">{t("Description", "ការពិពណ៌នា")}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">{t("Quantity", "បរិមាណ")}:</span>
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock_quantity}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 font-bold text-white"
                size="lg"
                disabled={product.stock_quantity === 0 || isLoading || adding}
                onClick={handleAddToCart}
                style={{ backgroundColor: adding ? "var(--color-active-purple)" : "var(--color-primary-pink)" }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {adding ? t("Adding...", "កំពុងបន្ថែម...") : t("Add to Cart", "បញ្ចូលទៅរទេះ")}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 bg-transparent"
                style={{ borderColor: "var(--color-primary-pink)", color: "var(--color-primary-pink)" }}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="rounded-lg bg-purple-50/50 p-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: "var(--color-active-purple)" }}>
                  ✓
                </span>
                {t("Clinically tested formula", "រូបមន្តដែលបានធ្វើតេស្តគ្លីនិក")}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: "var(--color-active-purple)" }}>
                  ✓
                </span>
                {t("Free shipping on orders over $50", "ដឹកជញ្ជូនឥតគិតថ្លៃលើការបញ្ជាទិញលើសពី $50")}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold" style={{ color: "var(--color-active-purple)" }}>
                  ✓
                </span>
                {t("30-day return guarantee", "ការធានាត្រឡប់មកវិញ 30 ថ្ងៃ")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
