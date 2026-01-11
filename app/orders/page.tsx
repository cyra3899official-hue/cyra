import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function OrdersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <div className="space-y-4">
        {orders?.map((order: any) => (
          <Card key={order.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">Order {order.order_number}</p>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{order.order_items?.length} items</p>
              </div>

              <div className="text-right">
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <p className="mt-2 text-lg font-bold">${Number.parseFloat(order.total).toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link href={`/orders/${order.id}`} className="text-sm font-medium text-primary hover:underline">
                View Details
              </Link>
            </div>
          </Card>
        ))}

        {!orders ||
          (orders.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">You haven't placed any orders yet</p>
              <Link href="/products" className="mt-4 inline-block text-primary hover:underline">
                Start Shopping
              </Link>
            </Card>
          ))}
      </div>
    </div>
  )
}
