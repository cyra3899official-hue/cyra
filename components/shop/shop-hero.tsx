"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { products } from "@/lib/products"

export function ShopHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bestSellers = products.slice(0, 5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bestSellers.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bestSellers.length])

  const currentProduct = bestSellers[currentIndex]

  return (
    <div className="relative w-full h-screen md:h-[600px] bg-gradient-to-br from-white via-white to-secondary overflow-hidden">
      {/* Animated liquid wave background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <filter id="liquid-wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <motion.path
          d="M 0,300 Q 300,250 600,300 T 1200,300 L 1200,600 L 0,600 Z"
          fill="url(#liquid-gradient)"
          filter="url(#liquid-wave)"
          animate={{
            d: [
              "M 0,300 Q 300,250 600,300 T 1200,300 L 1200,600 L 0,600 Z",
              "M 0,350 Q 300,300 600,350 T 1200,350 L 1200,600 L 0,600 Z",
              "M 0,300 Q 300,250 600,300 T 1200,300 L 1200,600 L 0,600 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Product Details */}
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Featured Product
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">{currentProduct.name}</h1>
              <p className="text-lg text-muted-foreground">{currentProduct.benefit}</p>
            </div>
            <p className="text-4xl font-bold text-primary">{currentProduct.price}</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                Shop Now
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition">
                Learn More
              </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 pt-4">
              {bestSellers.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition ${idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Product Image */}
          <motion.div
            key={`image-${currentProduct.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            <div className="relative w-64 h-64 md:w-full md:h-full max-w-96 max-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <img
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                className="relative w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
