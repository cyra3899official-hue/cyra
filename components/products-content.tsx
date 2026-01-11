"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import { CartDrawer } from "@/components/cart-drawer"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { FilterBar } from "@/components/filter-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Product, Category } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

const PRODUCTS_PER_PAGE = 12

export function ProductsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language, t } = useLanguage()
  const supabase = createClient()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const minPrice = searchParams.get("min_price") || ""
  const maxPrice = searchParams.get("max_price") || ""
  const sort = searchParams.get("sort") || "featured"

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [page, search, category, minPrice, maxPrice, sort])

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name_en")
    if (data) setCategories(data)
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from("products")
        .select(`*, product_images(image_url), categories(*)`, { count: "exact" }) // Include image_url in the select query
        .eq("is_active", true)

      if (search) {
        query = query.or(`name_en.ilike.%${search}%,name_km.ilike.%${search}%,description_en.ilike.%${search}%`)
      }

      if (category) {
        query = query.eq("category_id", category)
      }

      if (minPrice) {
        query = query.gte("price", Number.parseFloat(minPrice))
      }

      if (maxPrice) {
        query = query.lte("price", Number.parseFloat(maxPrice))
      }

      switch (sort) {
        case "price-asc":
          query = query.order("price", { ascending: true })
          break
        case "price-desc":
          query = query.order("price", { ascending: false })
          break
        case "newest":
          query = query.order("created_at", { ascending: false })
          break
        case "popular":
          query = query.order("is_featured", { ascending: false })
          break
        default:
          query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false })
      }

      const from = (page - 1) * PRODUCTS_PER_PAGE
      const to = from + PRODUCTS_PER_PAGE - 1
      query = query.range(from, to)

      const { data, count } = await query

      setProducts((data as Product[]) || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set("page", "1")
    router.push(`/products?${params.toString()}`)
  }

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

  const FilterSidebar = () => (
    <FilterBar
      categories={categories}
      selectedCategory={category}
      minPrice={minPrice}
      maxPrice={maxPrice}
      onCategoryChange={(val) => updateFilters("category", val)}
      onPriceChange={(min, max) => {
        updateFilters("min_price", min)
        updateFilters("max_price", max)
      }}
      onClearFilters={() => {
        router.push("/products")
      }}
    />
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gradient-to-br from-pink-50/30 to-purple-50/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold" style={{ color: "var(--color-primary-pink)" }}>
            {t("Shop", "ទំព័រកាណែនាំ")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("Discover clinically tested skincare products", "ស្វែងរកផលិតផលថែរក្សាស្បែកដែលបានធ្វើតេស្តគ្លីនិក")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-4">
              <FilterSidebar />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  {loading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <>
                      {totalCount} {t("products", "ផលិតផល")}
                    </>
                  )}
                </p>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                      <Filter className="mr-2 h-4 w-4" />
                      {t("Filters", "តម្រង")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>
              </div>

              <Select value={sort} onValueChange={(val) => updateFilters("sort", val)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t("Sort by", "តម្រៀបតាម")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t("Featured", "លេចធ្លោ")}</SelectItem>
                  <SelectItem value="popular">{t("Popular", "ពេញនិយម")}</SelectItem>
                  <SelectItem value="newest">{t("Newest", "ថ្មីបំផុត")}</SelectItem>
                  <SelectItem value="price-asc">{t("Price: Low to High", "តម្លៃ: ទាបទៅខ្ពស់")}</SelectItem>
                  <SelectItem value="price-desc">{t("Price: High to Low", "តម្លៃ: ខ្ពស់ទៅទាប")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onQuickView={() => setSelectedProduct(product)} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page <= 1}
                      onClick={() => updateFilters("page", (page - 1).toString())}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => {
                        return p === 1 || p === totalPages || Math.abs(p - page) <= 1
                      })
                      .map((p, i, arr) => {
                        const showEllipsis = i > 0 && p - arr[i - 1] > 1
                        return (
                          <div key={p} className="flex items-center gap-2">
                            {showEllipsis && <span className="text-gray-400">...</span>}
                            <Button
                              variant={p === page ? "default" : "outline"}
                              size="icon"
                              onClick={() => updateFilters("page", p.toString())}
                              style={
                                p === page
                                  ? { backgroundColor: "var(--color-primary-pink)", color: "white" }
                                  : undefined
                              }
                            >
                              {p}
                            </Button>
                          </div>
                        )
                      })}

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page >= totalPages}
                      onClick={() => updateFilters("page", (page + 1).toString())}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-24 text-center">
                <p className="text-lg text-gray-500">{t("No products found", "រកមិនឃើញផលិតផល")}</p>
                <Button
                  className="mt-4 bg-transparent"
                  variant="outline"
                  onClick={() => router.push("/products")}
                  style={{ borderColor: "var(--color-primary-pink)", color: "var(--color-primary-pink)" }}
                >
                  {t("Clear all filters", "លុបតម្រងទាំងអស់")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CartDrawer />

      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
