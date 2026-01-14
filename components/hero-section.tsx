import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-foreground">CYRA STORE</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light">AI-Powered Skincare for You</p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Discover premium skincare solutions tailored to your unique skin type with our advanced AI skin analyzer
          technology
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 font-medium transition-all duration-300 shadow-sm"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Analyze Your Skin Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border border-border text-foreground hover:bg-secondary rounded-lg px-8 font-medium bg-white"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop Products
          </Button>
        </div>
      </div>
    </section>
  )
}
