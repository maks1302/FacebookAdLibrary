import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <div className="bg-white rounded-xl border p-6 sticky top-4 shadow-sm">
        <h2 className="font-semibold text-xl mb-6 text-gray-800">Filters</h2>

        <div className="space-y-6">
          {/* Ad Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ad Type</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Ads" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ads</SelectItem>
                <SelectItem value="image">Image Ads</SelectItem>
                <SelectItem value="video">Video Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Media Type</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="single">Single Image</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Target Location</Label>
            <Select defaultValue="region">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="region">Select region</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Selected Countries</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selected Countries (246)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {/* Add more countries as needed */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </aside>
  )
}

