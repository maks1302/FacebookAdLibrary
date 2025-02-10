import Link from "next/link"
import { BookmarkIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            Ad Library
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <BookmarkIcon className="h-5 w-5" />
            Saved Ads
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  )
}

