import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">AI App Store</h1>
      <p className="text-muted-foreground max-w-[600px] mb-8">
        Discover and deploy cutting-edge AI models for your projects. Our curated collection features the best models
        for image generation, text processing, code assistance, and more.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/browse">Explore Models</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/upload">Upload Model</Link>
        </Button>
      </div>
    </div>
  )
}
