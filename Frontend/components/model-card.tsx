import { MessageSquare, Star, StarHalf, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface ModelCardProps {
  id: number
  title: string
  description: string
  rating: number
  imageSrc?: string
  verified?: boolean
  category?: string
}

export default function ModelCard({ id, title, description, rating, imageSrc, verified, category }: ModelCardProps) {
  return (
    <Link href={`/chat?agentId=${id}`} className="no-underline group">
      <Card className="relative h-full flex flex-col overflow-hidden font-sans transition-colors duration-300">
        {verified && (
          <div className="absolute top-7 right-7">
            <Image src="/images/verified.png" alt="Verified" width={30} height={30} className="object-contain" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:text-[var(--blue)]">{title}</CardTitle>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }, (_, index) => {
              if (rating >= index + 1) {
                return <Star key={index} className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />;
              } else if (rating > index && rating < index + 1) {
                return <StarHalf key={index} className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />;
              } else {
                return <Star key={index} className="h-3 w-3 mr-1 fill-gray-300 text-gray-300" />;
              }
            })}
            <span className="ml-2 text-xs font-medium group-hover:text-[var(--blue)]">{rating.toFixed(1)}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground max-w-[60%] group-hover:text-[var(--blue)]">{description}</p>
        </CardContent>
        <CardFooter className="relative">
          {category && (
            <div className="absolute left-5 bottom-5">
              <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
          )}
          {imageSrc && (
            <div className="absolute right-0 bottom-0 h-32 w-32">
              <Image src={imageSrc || "/placeholder.svg"} alt={title} width={128} height={128} className="object-cover" />
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
