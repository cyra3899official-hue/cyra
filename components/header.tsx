"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home", khmerLabel: "ទំព័រដើម" },
  { href: "/shop", label: "Shop", khmerLabel: "ឈានដល់" },
  { href: "/blog", label: "Blog", khmerLabel: "ប្លក់" },
  { href: "/about", label: "About Us", khmerLabel: "អំពីយើងខ្ញុំ" },
  { href: "/contact", label: "Contact Us", khmerLabel: "ទាក់ទងយើងខ្ញុំ" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full glassmorphism border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-lg md:text-xl text-pink-500 hover:text-purple-600 transition-colors duration-200"
          >
            CYRA AI STORE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-pink-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Skin Analysis CTA */}
            <Link
              href="/#analysis"
              className="hidden md:inline-flex items-center justify-center px-6 py-2 bg-pink-500 text-white font-bold rounded-full text-sm hover:bg-purple-600 transition-colors duration-200"
            >
              ពិនិត្យស្បែកមុខ
            </Link>

            {/* Icons */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors duration-200">
              <User size={20} />
            </button>
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors duration-200">
              <ShoppingCart size={20} />
            </button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-pink-500">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glassmorphism [&>button]:hidden">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-pink-500">CYRA AI STORE</h2>
                  <SheetClose asChild>
                    <button className="p-2 hover:bg-pink-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                      <X size={20} />
                    </button>
                  </SheetClose>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="flex items-center py-2 px-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-500 transition-colors duration-200 font-medium"
                      >
                        <span className="mr-2">{link.label}</span>
                        <span className="text-xs text-gray-400">({link.khmerLabel})</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700 space-y-2">
                  <SheetClose asChild>
                    <Link
                      href="/#analysis"
                      className="block w-full px-4 py-2 bg-pink-500 text-white font-bold rounded-full text-center hover:bg-purple-600 transition-colors duration-200"
                    >
                      ពិនិត្យស្បែកមុខ
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
