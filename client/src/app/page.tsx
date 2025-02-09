import { AppShell } from "@/components/layout/app-shell";
import { SearchBar } from "@/components/search/search-bar";
import { AdsGrid } from "@/components/ads-grid";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Search Section */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Discover Millions of Ads
          </h1>
          <p className="text-gray-500 text-center max-w-2xl">
            Explore and analyze Facebook ads from around the world. Find inspiration,
            track competitors, and understand market trends.
          </p>
          <SearchBar onSearch={console.log} />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Results</h2>
            <span className="text-sm text-gray-500">13,687,853 ads found</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-gray-600">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by
            </Button>
          </div>
        </div>

        {/* Ads Grid */}
        <AdsGrid ads={[]} /> {/* Pass your actual ads data here */}
      </div>
    </AppShell>
  );
}
