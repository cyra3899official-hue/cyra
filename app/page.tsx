"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import { AISkinScanModal } from "@/components/ai-skin-scan-modal"
import { useLanguage } from "@/lib/language-context"
import type { Product } from "@/lib/types"

export default function HomePage() {
  const { t } = useLanguage()
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: products } = await supabase
        .from("products")
        .select(
          `
          *,
          product_images(*),
          categories(*)
        `,
        )
        .eq("is_featured", true)
        .eq("is_active", true)
        .limit(8)

      const { data: cats } = await supabase.from("categories").select("*").is("parent_id", null).limit(4)

      if (products) setFeaturedProducts(products as Product[])
      if (cats) setCategories(cats)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-col bg-white">
        <section className="relative bg-white py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/30" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-balance text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
                style={{ color: "var(--color-primary-pink)" }}
              >
                {t("Clinical Skincare, Powered by AI", "ថែស្បែកព្យាបាល ដែលដំណើរការដោយ AI")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 text-pretty text-xl font-medium md:text-2xl"
                style={{ color: "var(--color-active-purple)" }}
              >
                {t("Personalized Results, Professional Care", "លទ្ធផលផ្ទាល់ខ្លួន ការថែទាំប្រកបដោយវិជ្ជាជីវៈ")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-sm text-black max-w-2xl mx-auto leading-relaxed"
              >
                {t(
                  "Discover your skin's unique needs with our advanced AI skin analysis. Get clinically-backed product recommendations tailored just for you.",
                  "រកឃើញតម្រូវការពិសេសរបស់ស្បែករបស់អ្នកជាមួយការវិភាគស្បែក AI ធ្វើឱ្យប្រសើរ។ ទទួលបានអនុសាសន៍ផលិតផលដែលបានបញ្ជាក់ដោយគ្លីនិកសម្រាប់អ្នក។",
                )}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={() => setIsScanModalOpen(true)}
                    className="font-bold text-white rounded-[12px] shadow-[0_8px_24px_rgba(124,58,237,0.08)] hover:brightness-95 active:scale-95 transition-all px-8 py-6 text-lg"
                    style={{ backgroundColor: "var(--color-primary-pink)" }}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t("Start Analysis", "ចាប់ផ្តើមវិភាគ")}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="ml-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="font-medium rounded-[12px] px-8 py-6 text-lg focus-visible:ring-2 transition-all bg-transparent"
                    style={{
                      borderColor: "var(--color-primary-pink)",
                      color: "var(--color-primary-pink)",
                    }}
                  >
                    <Link href="/products">{t("Browse Products", "រកមើលផលិតផល")}</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
                {t("Shop by Category", "ទិញតាមប្រភេទ")}
              </h2>
              <p className="mt-2 text-sm text-black">
                {t("Find exactly what you're looking for", "រកឃើញអ្វីដែលអ្នកស្វែងរក")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories?.map((category: any) => (
                <motion.div key={category.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="group block rounded-lg border border-gray-200 bg-white p-6 text-center transition-all hover:border-[var(--color-primary-pink)] hover:shadow-[0_8px_24px_rgba(255,45,135,0.12)]"
                  >
                    <h3
                      className="font-bold group-hover:text-[var(--color-primary-pink)] transition-colors"
                      style={{ color: "var(--color-primary-pink)" }}
                    >
                      {category.name_en}
                    </h3>
                    <p className="mt-1 text-sm text-black">{category.name_km}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
                  {t("Featured Products", "ផលិតផលពិសេស")}
                </h2>
                <p className="mt-2 text-sm text-black">{t("Clinically recommended for you", "ណែនាំដោយគ្លីនិកសម្រាប់អ្នក")}</p>
              </div>
              <Button variant="ghost" asChild className="hover:text-[var(--color-primary-pink)]">
                <Link href="/products">
                  {t("View All", "មើលទាំងអស់")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <AISkinScanModal isOpen={isScanModalOpen} onClose={() => setIsScanModalOpen(false)} />
    </>
  )
}
