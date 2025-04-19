"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function UploadPage() {
  const [traits, setTraits] = useState([50, 50, 50, 50])

  const handleTraitChange = (index: number, value: number[]) => {
    const newTraits = [...traits]
    newTraits[index] = value[0]
    setTraits(newTraits)
  }

  const traitLabels = [
    { name: "Trait 1", left: "TraitLeft0", right: "TraitRight0" },
    { name: "Trait 2", left: "TraitLeft1", right: "TraitRight1" },
    { name: "Trait 3", left: "TraitLeft2", right: "TraitRight2" },
    { name: "Trait 4", left: "TraitLeft3", right: "TraitRight3" },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Upload Your Model</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Trait sliders */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {traitLabels.map((trait, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-center font-medium">{trait.name}</div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground w-24 text-right">{trait.left}</span>
                        <Slider
                          value={[traits[index]]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => handleTraitChange(index, value)}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-24">{trait.right}</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" className="flex-1">
                      Upload Model
                    </Button>
                    <Button className="flex-1">Submit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Image */}
          <div className="md:w-1/3 flex justify-center">
            <div className="relative h-[500px] w-full max-w-[300px] overflow-hidden rounded-lg">
              <Image src="/images/landscape.jpeg" alt="Model visualization" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
