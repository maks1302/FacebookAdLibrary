import { Search, Calendar } from "lucide-react"
import { Header } from "@/app/components/header"
import { Sidebar } from "@/app/components/sidebar"
import { AdCard } from "@/app/components/ad-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="max-w-[1800px] mx-auto px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Facebook Ads Library Browser</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore and analyze Facebook ads from around the world. Find inspiration, track competitors, and understand
            market trends.
          </p>
        </div>

        <div className="flex gap-12">
          <Sidebar className="w-80 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="mb-8 space-y-6 bg-white p-6 rounded-xl shadow-sm">
              {/* Search input with button */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="search"
                  placeholder="Search ads by keyword, advertiser, or topic..."
                  className="w-full pl-12 pr-[120px] py-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-lg"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-all duration-300 text-base font-medium">
                  Search
                </Button>
              </div>

              {/* Exact Phrase Match checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox id="exact-match" className="h-5 w-5" />
                <Label htmlFor="exact-match" className="text-base text-gray-700">
                  Exact Phrase Match
                </Label>
              </div>

              {/* Date selectors and Sort dropdown in one row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Select defaultValue="quick">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Last 7 days" />
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
                    Select custom dates
                  </Button>
                </div>

                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Sort by: Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                    <SelectItem value="date-desc">Date: Newest First</SelectItem>
                    <SelectItem value="date-asc">Date: Oldest First</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results grid - keeping the existing ad cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              <AdCard
                advertiser="My Pet Canvas"
                adId="336588952852972"
                timeAgo="7 months ago"
                imageUrl="/placeholder.svg"
                description="Surprise your loved ones with a personalized portrait of their furry friend! Each canvas is a unique work of art, created with love and attention to detail."
                categories={["E-Commerce & Online Shopping", "Pets & Animal Care"]}
                startDate="Jul 26, 2024"
                endDate="Jul 27, 2024"
              />
              <AdCard
                advertiser="HeartlyLove"
                adId="336724506115660"
                timeAgo="8 months ago"
                imageUrl="/placeholder.svg"
                description="Enjoy peaceful evenings in your yard with the Norvure SolarGuard™ Bug Zapper. Advanced purple light waves attract and eliminate mosquitoes instantly."
                categories={["Home & Living", "Outdoor & Adventure"]}
                startDate="Jun 12, 2024"
                endDate="Jun 12, 2024"
              />
              <AdCard
                advertiser="My Pet Canvas"
                adId="336588952852973"
                timeAgo="7 months ago"
                imageUrl="/placeholder.svg"
                description="Transform your pet's photo into vibrant art! Each canvas is a unique work of art, created with love and attention to detail."
                categories={["E-Commerce & Online Shopping", "Pets & Animal Care"]}
                startDate="Jul 26, 2024"
                endDate="Jul 27, 2024"
              />
              <AdCard
                advertiser="HeartlyLove"
                adId="336724506115661"
                timeAgo="8 months ago"
                imageUrl="/placeholder.svg"
                description="Solar-powered bug zapper with advanced purple light technology. Perfect for your backyard!"
                categories={["Home & Living", "Outdoor & Adventure"]}
                startDate="Jun 12, 2024"
                endDate="Jun 12, 2024"
              />
              <AdCard
                advertiser="My Pet Canvas"
                adId="336588952852974"
                timeAgo="7 months ago"
                imageUrl="/placeholder.svg"
                description="Custom pet portraits that capture the spirit of your furry friend. Order now and save 20%!"
                categories={["E-Commerce & Online Shopping", "Pets & Animal Care"]}
                startDate="Jul 26, 2024"
                endDate="Jul 27, 2024"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

