import Link from "next/link"
import Typewriter from "@/components/Typewriter";
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center mt-8 text-center md:py-16 relative">
      <Typewriter text="Advise.me" className="text-9xl font-bold tracking-tighter mb-4" />
      <p className="text-muted-foreground max-w-[600px] mb-8" style={{ color: "rgb(45, 57, 117)" }}>
        Come enjoy a conversational experience with one of our commmunity-based personal AI advisors. Get answers to ANY question from a selection of 100+ professionals. Click on one of our advisors to get started!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" style={{ backgroundColor: "rgb(79, 100, 204)" }}>
          <Link href="/browse">Explore Advisors</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/upload">Upload Model</Link>
        </Button>
      </div>
    </div>
  )
}
