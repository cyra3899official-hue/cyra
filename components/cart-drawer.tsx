"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function CartDrawer() {
  const { cart, cartCount, updateQuantity, removeFromCart, isLoading } = useCart()
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
          size="icon"
          style={{ backgroundColor: "var(--color-primary-pink)" }}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 h-6 w-6 rounded-full p-0 text-xs font-bold"
              style={{ backgroundColor: "var(--color-active-purple)" }}
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2 text-2xl" style={{ color: "var(--color-primary-pink)" }}>
            <ShoppingCart className="h-6 w-6" />
            {t("Shopping Cart", "រទេះទិញទំនិញ")} ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">{t("Your cart is empty", "រទេះរបស់អ្នកនៅទទេ")}</p>
            <Button onClick={() => setOpen(false)} style={{ backgroundColor: "var(--color-primary-pink)" }} asChild>
              <Link href="/products">{t("Continue Shopping", "ទិញទំនិញបន្ត")}</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 py-4 space-y-4">
              {cart.map((item) => {
                const name = language === "en" ? item.products.name_en : item.products.name_km
                const imageUrl = item.products.product_images?.[0]?.image_url || "/placeholder.svg"

                return (
                  <div key={item.id} className="flex gap-4 rounded-lg border p-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-semibold line-clamp-2" style={{ color: "var(--color-primary-pink)" }}>
                        {name}
                      </h3>
                      <p className="mt-1 text-sm font-bold">${item.price.toFixed(2)}</p>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("Subtotal", "សរុបរង")}</span>
                <span style={{ color: "var(--color-primary-pink)" }}>${subtotal.toFixed(2)}</span>
              </div>

              <Button
                className="w-full text-white font-bold"
                size="lg"
                style={{ backgroundColor: "var(--color-primary-pink)" }}
                asChild
              >
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  {t("Checkout", "ទូទាត់")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setOpen(false)}
                style={{ borderColor: "var(--color-primary-pink)", color: "var(--color-primary-pink)" }}
                asChild
              >
                <Link href="/products">{t("Continue Shopping", "ទិញទំនិញបន្ត")}</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
