import Navbar from "@/components/navbar"
import Filters from "@/components/filters"
import ModelCard from "@/components/model-card"
import { Button } from "@/components/ui/button"

export default function BrowsePage() {
  // This would typically come from a database or API
  const models = [
    {
      title: "Image Generator",
      description: "Create stunning images with our AI model",
      rating: 4.8,
      imageSrc: "/images/old.webp",
      category: "Image",
    },
    {
      title: "Text Completion",
      description: "Advanced text generation for any use case",
      rating: 4.5,
      imageSrc: "/images/girl.webp",
      category: "Text",
    },
    {
      title: "Code Assistant",
      description: "Get help with coding tasks and debugging",
      rating: 4.9,
      imageSrc: "/images/artist.webp",
      category: "Code",
    },
    {
      title: "Voice Synthesis",
      description: "Natural-sounding voice generation",
      rating: 4.6,
      imageSrc: "/images/hat.webp",
      category: "Audio",
    },
    {
      title: "Image Classifier",
      description: "Identify objects and scenes in images",
      rating: 4.3,
      imageSrc: "/images/old.webp",
      category: "Image",
    },
    {
      title: "Language Translator",
      description: "Translate text between multiple languages",
      rating: 4.7,
      imageSrc: "/images/girl.webp",
      category: "Text",
    },
    {
      title: "Data Analyzer",
      description: "Extract insights from complex datasets",
      rating: 4.4,
      imageSrc: "/images/artist.webp",
      category: "Data",
    },
    {
      title: "Speech Recognition",
      description: "Convert spoken language into written text",
      rating: 4.2,
      imageSrc: "/images/hat.webp",
      category: "Audio",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Browse Models</h1>
          <p className="text-muted-foreground">
            Discover and explore our collection of AI models for various applications
          </p>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Filters />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Showing {models.length} models</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm">
                  Popularity
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <ModelCard
                  key={index}
                  title={model.title}
                  description={model.description}
                  rating={model.rating}
                  imageSrc={model.imageSrc}
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
