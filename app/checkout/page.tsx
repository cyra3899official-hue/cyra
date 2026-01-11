"use client"

import type React from "react"

import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        if (profile) {
          setShippingAddress((prev) => ({
            ...prev,
            fullName: profile.full_name || "",
            phone: profile.phone || "",
          }))
        }
      }
    }
    checkUser()
  }, [router])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 5
  const total = subtotal + tax + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          status: "pending",
          subtotal,
          tax,
          shipping_cost: shipping,
          total,
          payment_method: paymentMethod,
          payment_status: "pending",
          shipping_address: shippingAddress,
          notes,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price: item.price,
        product_name_en: item.products.name_en,
        product_name_km: item.products.name_km,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      await clearCart()

      // Redirect to success page
      router.push(`/checkout/success?order=${orderNumber}`)
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      alert(t("Failed to create order. Please try again.", "បរាជ័យក្នុងការបង្កើតការបញ្ជាទិញ។"))
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-md p-12 text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-muted-foreground" />
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">{t("Checkout", "ទូទាត់ប្រាក់")}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold">{t("Shipping Address", "អាសយដ្ឋានដឹកជញ្ជូន")}</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">{t("Full Name", "ឈ្មោះពេញ")}</Label>
                  <Input
                    id="fullName"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">{t("Phone Number", "លេខទូរស័ព្ទ")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressLine1">{t("Address Line 1", "អាសយដ្ឋាន")}</Label>
                  <Input
                    id="addressLine1"
                    required
                    value={shippingAddress.addressLine1}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="addressLine2">{t("Address Line 2 (Optional)", "អាសយដ្ឋាន 2")}</Label>
                  <Input
                    id="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">{t("City", "ទីក្រុង")}</Label>
                    <Input
                      id="city"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="province">{t("Province", "ខេត្ត")}</Label>
                    <Input
                      id="province"
                      required
                      value={shippingAddress.province}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postalCode">{t("Postal Code", "លេខកូដ")}</Label>
                  <Input
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold">{t("Payment Method", "វិធីសាស្ត្រទូទាត់")}</h2>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">{t("Cash on Delivery", "ទូទាត់ពេលទទួលទំនិញ")}</SelectItem>
                  <SelectItem value="bank">{t("Bank Transfer", "ផ្ទេរប្រាក់តាមធនាគារ")}</SelectItem>
                  <SelectItem value="card">{t("Credit/Debit Card", "កាតឥណទាន")}</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-bold">{t("Order Notes (Optional)", "កំណត់ចំណាំ")}</h2>
              <Textarea
                placeholder={t("Any special instructions for your order", "សេចក្តីណែនាំពិសេស")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </Card>
          </div>

          <div>
            <Card className="p-6 space-y-4 sticky top-24">
              <h2 className="text-xl font-bold">{t("Order Summary", "សង្ខេបការបញ្ជាទិញ")}</h2>

              <Separator />

              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.products.name_en} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

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

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("Processing...", "កំពុងដំណើរការ...")}
                  </>
                ) : (
                  t("Place Order", "បញ្ជាទិញ")
                )}
              </Button>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
