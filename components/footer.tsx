"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">CYRA STORE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                "Your trusted e-commerce destination for quality products at great prices.",
                "គោលដៅអេឡិចត្រូនិកពាណិជ្ជកម្មដែលអ្នកទុកចិត្តសម្រាប់ផលិតផលគុណភាពក្នុងតម្លៃល្អ",
              )}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("Quick Links", "តំណភ្ជាប់រហ័ស")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Products", "ផលិតផល")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Categories", "ប្រភេទ")}
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Deals", "ការបញ្ចុះតម្លៃ")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("About Us", "អំពីយើង")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("Customer Service", "សេវាកម្មអតិថិជន")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Contact Us", "ទាក់ទងយើង")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Shipping Info", "ព័ត៌មានដឹកជញ្ជូន")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("Returns", "ការត្រឡប់មកវិញ")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("FAQ", "សំណួរ")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t("Contact Info", "ព័ត៌មានទំនាក់ទំនង")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">123 Street, Phnom Penh, Cambodia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">+855 12 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">support@cyrastore.com</span>
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} CYRA STORE. {t("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។")}
          </p>
        </div>
      </div>
    </footer>
  )
}
