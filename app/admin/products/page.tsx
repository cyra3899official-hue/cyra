import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images(*),
      categories(*)
    `,
    )
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button>Add Product</Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {products?.map((product: any) => {
            const imageUrl = product.product_images?.[0]?.image_url || "/placeholder.svg?height=80&width=80"

            return (
              <div key={product.id} className="flex items-center gap-4 border-b pb-4 last:border-0">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={imageUrl || "/placeholder.svg"} alt={product.name_en} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{product.name_en}</h3>
                      <p className="text-sm text-muted-foreground">{product.sku}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{product.categories?.name_en}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">${Number.parseFloat(product.price).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    {product.is_featured && <Badge variant="secondary">Featured</Badge>}
                    <Badge variant={product.is_active ? "default" : "outline"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {product.stock_quantity === 0 && <Badge variant="destructive">Out of Stock</Badge>}
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
              </div>
            )
          })}

          {!products ||
            (products.length === 0 && <p className="py-8 text-center text-muted-foreground">No products found</p>)}
        </div>
      </Card>
    </div>
  )
}
