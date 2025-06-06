import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ModelCard from "@/components/model-card"
import { agents } from "@/data/agents"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <HeroSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-auto mb-8">
          {agents.slice(0, 4).map((agent) => (
            <ModelCard
              key={agent.id}
              id={agent.id}
              title={agent.title}
              description={agent.description}
              rating={agent.rating}
              imageSrc={agent.imageSrc}
              verified={agent.verified}
              category={agent.category}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
