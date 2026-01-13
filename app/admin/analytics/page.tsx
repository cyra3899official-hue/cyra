import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, ShoppingCart, DollarSign } from "lucide-react"

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  // Get analytics data
  const [
    { count: pageViews },
    { count: productViews },
    { count: addToCarts },
    { count: purchases },
    { data: topProducts },
    { data: recentEvents },
  ] = await Promise.all([
    supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "page_view"),
    supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "product_view"),
    supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "add_to_cart"),
    supabase.from("analytics_events").select("*", { count: "exact", head: true }).eq("event_type", "purchase"),
    supabase.rpc("get_top_products" as any).limit(10),
    supabase.from("analytics_events").select("*").order("created_at", { ascending: false }).limit(20),
  ])

  // Calculate conversion rate
  const conversionRate = pageViews ? ((purchases || 0) / pageViews) * 100 : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageViews || 0}</div>
            <p className="text-xs text-muted-foreground">Total page visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Product Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productViews || 0}</div>
            <p className="text-xs text-muted-foreground">Products viewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Add to Carts</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addToCarts || 0}</div>
            <p className="text-xs text-muted-foreground">Items added to cart</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">{purchases || 0} purchases</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents?.slice(0, 10).map((event: any) => (
                <div key={event.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{event.event_type.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">{new Date(event.created_at).toLocaleString()}</p>
                  </div>
                  {event.metadata && (
                    <p className="text-xs text-muted-foreground">
                      {JSON.stringify(event.metadata).substring(0, 30)}...
                    </p>
                  )}
                </div>
              ))}
              {!recentEvents ||
                (recentEvents.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground">No events tracked yet</p>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Page Views</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "100%" }} />
                  </div>
                  <span className="text-sm font-medium">{pageViews || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Product Views</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: pageViews ? `${((productViews || 0) / pageViews) * 100}%` : "0%",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{productViews || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Add to Carts</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: pageViews ? `${((addToCarts || 0) / pageViews) * 100}%` : "0%",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{addToCarts || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Purchases</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: pageViews ? `${((purchases || 0) / pageViews) * 100}%` : "0%",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{purchases || 0}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
