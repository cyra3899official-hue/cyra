import { notFound } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { ProductViewTracker } from "@/components/product-view-tracker"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images(*),
      categories(*)
    `,
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (!product) {
    notFound()
  }

  const images = (product.product_images || []).sort((a: any, b: any) => a.position - b.position)
  const mainImage = product.image_url || images[0]?.image_url || "/skincare-product-display.png"
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <>
      <ProductViewTracker productId={product.id} productName={product.name_en} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image src={mainImage || "/placeholder.svg"} alt={product.name_en} fill className="object-cover" />
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                  -{discount}%
                </Badge>
              )}
            </div>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img: any) => (
                  <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={img.image_url || "/placeholder.svg"}
                      alt={img.alt_text_en || product.name_en}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {product.is_featured && <Badge className="mb-2">Featured</Badge>}
              <h1 className="text-3xl font-bold leading-tight">{product.name_en}</h1>
              <p className="mt-2 text-xl text-muted-foreground">{product.name_km}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="text-2xl text-muted-foreground line-through">
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>

            {product.description_en && (
              <div>
                <h2 className="mb-2 font-semibold">Description</h2>
                <p className="text-muted-foreground">{product.description_en}</p>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Stock:</span>
                {product.stock_quantity > 0 ? (
                  <Badge variant="outline" className="text-green-600">
                    In Stock ({product.stock_quantity} available)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" disabled={product.stock_quantity === 0}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <Button size="lg" variant="secondary" className="w-full" disabled={product.stock_quantity === 0}>
                Buy Now
              </Button>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">100% secure transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
