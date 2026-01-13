"use client"

import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, cartCount, updateQuantity, removeFromCart, isLoading } = useCart()
  const { language, t } = useLanguage()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + tax + shipping

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-md p-12 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-bold">{t("Your cart is empty", "រទេះរបស់អ្នកទទេ")}</h2>
          <p className="mt-2 text-muted-foreground">
            {t("Start shopping to add items to your cart", "ចាប់ផ្តើមទិញទំនិញដើម្បីបញ្ចូលទៅក្នុងរទេះ")}
          </p>
          <Button className="mt-6" asChild>
            <Link href="/products">
              {t("Continue Shopping", "បន្តទិញទំនិញ")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{t("Shopping Cart", "រទេះទិញទំនិញ")}</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {cart.map((item) => {
            const name = language === "en" ? item.products.name_en : item.products.name_km
            const imageUrl = item.products.product_images?.[0]?.image_url || "/placeholder.svg?height=120&width=120"

            return (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.products.slug}`} className="font-semibold hover:text-primary">
                        {name}
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">SKU: {item.products.sku}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isLoading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div>
          <Card className="p-6 space-y-4 sticky top-24">
            <h2 className="text-xl font-bold">{t("Order Summary", "សង្ខេបការបញ្ជាទិញ")}</h2>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("Subtotal", "សរុបរង")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("Tax (10%)", "ពន្ធ (10%)")}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("Shipping", "ការដឹកជញ្ជូន")}</span>
                <span>{shipping === 0 ? t("Free", "ឥតគិតថ្លៃ") : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>{t("Total", "សរុប")}</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-muted-foreground">
                {t(
                  `Add $${(50 - subtotal).toFixed(2)} more for free shipping`,
                  `បន្ថែម $${(50 - subtotal).toFixed(2)} ទៀតដើម្បីទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃ`,
                )}
              </p>
            )}

            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">
                {t("Proceed to Checkout", "បន្តទៅការទូទាត់")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/products">{t("Continue Shopping", "បន្តទិញទំនិញ")}</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
