"use client"

import type React from "react"

import Link from "next/link"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"
import { useCart } from "@/lib/cart-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { cartCount } = useCart()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: "var(--color-primary-pink)" }}
            >
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
              CYRA STORE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium text-black transition-colors hover:text-[var(--color-primary-pink)]"
            >
              {t("Products", "ផលិតផល")}
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-black transition-colors hover:text-[var(--color-primary-pink)]"
            >
              {t("Categories", "ប្រភេទ")}
            </Link>
            <Link
              href="/deals"
              className="text-sm font-medium text-black transition-colors hover:text-[var(--color-primary-pink)]"
            >
              {t("Deals", "ការបញ្ចុះតម្លៃ")}
            </Link>
          </nav>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={t("Search products...", "ស្វែងរកផលិតផល...")}
              className="pl-10 border-gray-200 focus-visible:ring-[var(--color-active-purple)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-black hover:text-[var(--color-primary-pink)]">
                {language === "en" ? "EN" : "ខ្មែរ"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("km")}>ភាសាខ្មែរ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative hover:text-[var(--color-primary-pink)]" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" style={{ color: "var(--color-primary-pink)" }} />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs text-white font-bold"
                  style={{ backgroundColor: "var(--color-active-purple)" }}
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">{t("Cart", "រទេះ")}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:text-[var(--color-primary-pink)]">
            <Link href="/auth/login">
              <User className="h-5 w-5" style={{ color: "var(--color-primary-pink)" }} />
              <span className="sr-only">{t("Account", "គណនី")}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("Menu", "ម៉ឺនុយ")}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
