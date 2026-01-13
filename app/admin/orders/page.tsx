import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles(full_name, email)
    `,
    )
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage your store orders</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium">Order Number</th>
                <th className="pb-3 text-left font-medium">Customer</th>
                <th className="pb-3 text-left font-medium">Date</th>
                <th className="pb-3 text-left font-medium">Status</th>
                <th className="pb-3 text-left font-medium">Total</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-4 font-medium">{order.order_number}</td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{order.profiles?.full_name || "Guest"}</p>
                      <p className="text-sm text-muted-foreground">{order.profiles?.email}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </td>
                  <td className="py-4 font-bold">${Number.parseFloat(order.total).toFixed(2)}</td>
                  <td className="py-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!orders ||
            (orders.length === 0 && <p className="py-8 text-center text-muted-foreground">No orders found</p>)}
        </div>
      </Card>
    </div>
  )
}
