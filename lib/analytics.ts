"use client"

import { createClient } from "@/lib/supabase/client"

export async function trackEvent(eventType: string, metadata?: any) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("analytics_events").insert({
      event_type: eventType,
      user_id: user?.id || null,
      metadata,
    })
  } catch (error) {
    console.error("[v0] Analytics tracking error:", error)
  }
}

export function useAnalytics() {
  return {
    trackPageView: (page: string) => trackEvent("page_view", { page }),
    trackProductView: (productId: string, productName: string) =>
      trackEvent("product_view", { product_id: productId, product_name: productName }),
    trackAddToCart: (productId: string, quantity: number) =>
      trackEvent("add_to_cart", { product_id: productId, quantity }),
    trackPurchase: (orderId: string, total: number) => trackEvent("purchase", { order_id: orderId, total }),
    trackSearch: (query: string) => trackEvent("search", { query }),
  }
}
