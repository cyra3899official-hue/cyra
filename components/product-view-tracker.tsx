"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/lib/analytics"

interface ProductViewTrackerProps {
  productId: string
  productName: string
}

export function ProductViewTracker({ productId, productName }: ProductViewTrackerProps) {
  const { trackProductView } = useAnalytics()

  useEffect(() => {
    trackProductView(productId, productName)
  }, [productId, productName, trackProductView])

  return null
}
