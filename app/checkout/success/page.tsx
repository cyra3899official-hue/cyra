import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const params = await searchParams

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-md p-12 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-600" />
        <h1 className="mt-6 text-3xl font-bold">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase</p>

        {params.order && (
          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-bold">{params.order}</p>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          We've sent a confirmation email with your order details. You can track your order status in your account.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
