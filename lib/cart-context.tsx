"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { CartItem } from "@/lib/types"
import { useAnalytics } from "@/lib/analytics"

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  addToCart: (productId: string, quantity: number, variantId?: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()
  const { trackAddToCart } = useAnalytics()

  const refreshCart = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: userCart } = await supabase.from("cart").select("id").eq("user_id", user.id).single()

      let cartId = userCart?.id

      if (!cartId) {
        const { data: newCart } = await supabase.from("cart").insert({ user_id: user.id }).select("id").single()
        cartId = newCart?.id
      }

      if (cartId) {
        const { data: items } = await supabase
          .from("cart_items")
          .select(
            `
            *,
            products(*, product_images(*))
          `,
          )
          .eq("cart_id", cartId)

        setCart((items as CartItem[]) || [])
      }
    } catch (error) {
      console.error("[v0] Error refreshing cart:", error)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const addToCart = async (productId: string, quantity = 1, variantId?: string) => {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      const { data: userCart } = await supabase.from("cart").select("id").eq("user_id", user.id).single()

      let cartId = userCart?.id

      if (!cartId) {
        const { data: newCart } = await supabase.from("cart").insert({ user_id: user.id }).select("id").single()
        cartId = newCart?.id
      }

      const { data: product } = await supabase.from("products").select("price").eq("id", productId).single()

      if (!product) throw new Error("Product not found")

      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cartId!)
        .eq("product_id", productId)
        .maybeSingle()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          cart_id: cartId,
          product_id: productId,
          variant_id: variantId || null,
          quantity,
          price: product.price,
        })
      }

      await trackAddToCart(productId, quantity)

      await refreshCart()
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return
    setIsLoading(true)
    try {
      await supabase.from("cart_items").update({ quantity }).eq("id", itemId)
      await refreshCart()
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    setIsLoading(true)
    try {
      await supabase.from("cart_items").delete().eq("id", itemId)
      await refreshCart()
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: userCart } = await supabase.from("cart").select("id").eq("user_id", user.id).single()

      if (userCart) {
        await supabase.from("cart_items").delete().eq("cart_id", userCart.id)
        await refreshCart()
      }
    } catch (error) {
      console.error("[v0] Error clearing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
