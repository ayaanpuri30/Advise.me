import { MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface ModelCardProps {
  title: string
  description: string
  rating: number
  imageSrc?: string
}

export default function ModelCard({ title, description, rating, imageSrc }: ModelCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-8">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Message</span>
          </Button>
        </div>
        {imageSrc && (
          <div className="absolute right-0 bottom-0 h-16 w-16">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} width={64} height={64} className="object-cover" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
