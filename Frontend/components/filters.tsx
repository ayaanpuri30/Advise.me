"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import { agents } from "@/data/agents"

export default function Filters() {
  const [ratingRange, setRatingRange] = useState([0, 5])

  const uniqueCategories = Array.from(new Set(agents.map(agent => agent.category).filter((cat): cat is string => cat !== undefined)));
  const categories = uniqueCategories.map(cat => ({ id: cat.toLowerCase(), label: cat }));

  return (
    <div className="bg-card border rounded-lg p-4 sticky top-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search models..." className="pl-8" />
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "rating"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <label
                    htmlFor={category.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <Slider defaultValue={[0, 5]} max={5} step={0.1} value={ratingRange} onValueChange={setRatingRange} />
              <div className="flex justify-between">
                <span className="text-sm">{ratingRange[0].toFixed(1)}</span>
                <span className="text-sm">{ratingRange[1].toFixed(1)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
