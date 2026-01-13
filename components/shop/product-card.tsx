"use client"

import type React from "react"

import { useState } from "react"
import { Heart, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  benefit: string
  onAddToCart: (id: number) => void
}

export function ProductCard({ id, name, price, image, benefit, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 })

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipplePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setShowRipple(true)
    onAddToCart(id)
    setTimeout(() => setShowRipple(false), 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition duration-300 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary aspect-square">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Heart Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : "text-foreground"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{benefit}</p>
        </div>

        <div className="mt-3 space-y-2">
          <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="relative w-full py-2.5 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden shadow-sm"
          >
            {/* Ripple Effect */}
            {showRipple && (
              <motion.div
                className="absolute bg-white/30 rounded-full pointer-events-none"
                style={{
                  left: ripplePos.x,
                  top: ripplePos.y,
                  width: 20,
                  height: 20,
                  marginLeft: -10,
                  marginTop: -10,
                }}
                animate={{ scale: [1, 15] }}
                transition={{ duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
