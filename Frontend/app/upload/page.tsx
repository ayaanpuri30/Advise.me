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
    { name: "Brevity", left: "Concise", right: "Detailed" },
    { name: "Tone", left: "Blunt", right: "Indirect" },
    { name: "Professionalism", left: "Casual", right: "Professional" },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold tracking-tight mt-4 mb-6">Upload Your Model</h1>

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
                  <div className="space-y-4 mt-8">
                    <div>
                      <label htmlFor="modelName" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                      <input id="modelName" type="text" placeholder="Enter name" className="w-full border rounded-md p-2" />
                    </div>
                    <div>
                      <label htmlFor="modelDescription" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                      <textarea id="modelDescription" rows={3} placeholder="Enter description" className="w-full border rounded-md p-2"></textarea>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4 md:w-2/3 flex gap-4">
                <Button variant="outline" className="flex-1">Upload Model</Button>
                <Button className="flex-1">Submit</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Image */}
            <div className="w-1/2">
              <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
                <Image src="/images/custom.png" alt="Model visualization" fill className="object-cover" priority />
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">Customize Appearance</Button>
                <Button className="flex-1">Reset</Button>
              </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* <div className="w-full md:w-2/3 flex gap-4">
            <Button variant="outline" className="flex-1">Upload Model</Button>
            <Button className="flex-1">Submit</Button>
          </div> */}
          {/* <div className="md:w-1/3 flex gap-4 max-w-[300px]">
            <Button variant="outline" className="flex-1">Customize Appearance</Button>
            <Button className="flex-1">Reset</Button>
          </div> */}
        </div>
      </div>
    </main>
  )
}
