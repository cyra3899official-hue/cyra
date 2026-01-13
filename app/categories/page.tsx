import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").is("parent_id", null).order("name_en")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="mt-2 text-muted-foreground">Browse our wide range of product categories</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories?.map((category: any) => (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <Card className="group overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={category.image_url || "/placeholder.svg?height=300&width=300"}
                  alt={category.name_en}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-primary">{category.name_en}</h3>
                <p className="text-sm text-muted-foreground">{category.name_km}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
