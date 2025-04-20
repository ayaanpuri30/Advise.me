import Navbar from "@/components/navbar"
import Filters from "@/components/filters"
import ModelCard from "@/components/model-card"
import { Button } from "@/components/ui/button"
import { agents } from "@/data/agents"

export default function BrowsePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Explore Advisors</h1>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button variant="outline" size="sm">
                Popularity
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Filters />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
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

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
