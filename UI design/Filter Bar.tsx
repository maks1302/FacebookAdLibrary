// Filter bar component with advanced filters and date selection
import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function FilterBar() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [dateRange, setDateRange] = useState("quick")
  const [adType, setAdType] = useState("all")
  const [status, setStatus] = useState("all")
  const [mediaType, setMediaType] = useState("all")
  const [exactMatch, setExactMatch] = useState(false)

  const handleApplyFilters = () => {
    console.log("Applying filters:", { dateRange, adType, status, mediaType, exactMatch })
    // Here you would typically call a function to update the main component's state
    // or trigger a new search with these filter parameters
  }

  return (
    <div className="space-y-4">
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-sm">
              Advanced Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isAdvancedOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Custom dates
            </Button>
          </div>
        </div>

        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Ad Type</Label>
              <Select value={adType} onValueChange={setAdType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ad type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ads</SelectItem>
                  <SelectItem value="image">Image Ads</SelectItem>
                  <SelectItem value="video">Video Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Media Type</Label>
              <Select value={mediaType} onValueChange={setMediaType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="single">Single Image</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="exact-match" checked={exactMatch} onCheckedChange={setExactMatch} />
              <Label htmlFor="exact-match">Exact Phrase Match</Label>
            </div>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

