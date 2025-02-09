import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ onSearch, onFilterClick }: SearchBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder="Search ads by keyword, advertiser, or topic..."
          className="w-full pl-10 pr-20 h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilterClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
      </div>
      
      {/* Search Suggestions - can be added later */}
      {/* <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 mb-2">Recent Searches</div>
          <div className="space-y-1">
            {recentSearches.map((search) => (
              <div key={search} className="px-3 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer">
                {search}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
