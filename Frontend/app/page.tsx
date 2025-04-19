import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ModelCard from "@/components/model-card"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <HeroSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-auto mb-8">
          <ModelCard
            title="Albert"
            description="I'm an old man"
            rating={4.8}
            imageSrc="/images/old.webp"
          />
          <ModelCard
            title="Code Assistant"
            description="Get help with coding tasks and debugging."
            rating={4.5}
            imageSrc="/images/girl.webp"
          />
          <ModelCard
            title="Artist"
            description="Explore creative ideas and get inspired."
            rating={4.9}
            imageSrc="/images/artist.webp"
          />
          <ModelCard
            title="Dr. Magnus"
            description="Got a stomach ache?"
            rating={4.6}
            imageSrc="/images/hat.webp"
          />
        </div>
      </div>
    </main>
  )
}
