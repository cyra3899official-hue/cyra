"use client"

import Link from "next/link"
import { Facebook, Instagram, Music, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-pink-500 mb-2">CYRA AI STORE</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Skincare for You</p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <Music size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=best-sellers"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=new"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/track-order"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  789 Skincare Street, Beauty City, BC 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-pink-500 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-pink-500 flex-shrink-0" />
                <a
                  href="mailto:support@cyraaistores.com"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  support@cyra.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2026 CYRA AI STORE. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-500">Accepted payments:</span>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Visa
                </div>
                <div className="px-2 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-xs font-semibold text-gray-700 dark:text-gray-300">
                  MC
                </div>
                <div className="px-2 py-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-xs font-semibold text-gray-700 dark:text-gray-300">
                  ABA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
