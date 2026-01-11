export interface Product {
  id: string
  name_en: string
  name_km: string
  description_en: string | null
  description_km: string | null
  slug: string
  sku: string
  price: number
  compare_at_price: number | null
  stock_quantity: number
  is_featured: boolean
  is_active: boolean
  category_id: string | null
  created_at: string
  product_images?: ProductImage[]
  categories?: Category
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text_en: string | null
  alt_text_km: string | null
  position: number
}

export interface Category {
  id: string
  name_en: string
  name_km: string
  slug: string
  description_en: string | null
  description_km: string | null
  image_url: string | null
  parent_id: string | null
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  price: number
  products: Product
}
