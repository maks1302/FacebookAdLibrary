import { Share2, Bookmark, MoreVertical, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdCardProps {
  advertiser: string
  adId: string
  timeAgo: string
  imageUrl: string
  description: string
  categories: string[]
  startDate: string
  endDate: string
}

export function AdCard({
  advertiser,
  adId,
  timeAgo,
  imageUrl,
  description,
  categories,
  startDate,
  endDate,
}: AdCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{advertiser}</h3>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span className="font-medium text-gray-600">ID: {adId}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
          <img src={imageUrl || "/placeholder.svg"} alt="Ad creative" className="w-full h-full object-cover" />
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>
            {startDate} - {endDate}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

