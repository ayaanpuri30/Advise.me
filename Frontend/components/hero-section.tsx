import Link from "next/link"
import Typewriter from "./Typewriter";
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-8 text-center md:py-16">
      <Typewriter text="AID.ai" className="text-9xl font-bold tracking-tighter mb-4" />
      <p className="text-muted-foreground max-w-[600px] mb-8">
        Come enjoy a conversational experience with our commmunity-based personal AI advisors. Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah.
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
