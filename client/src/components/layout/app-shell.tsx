import React from "react";
import { Search, Settings, BookmarkIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Ad Library
                </span>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Saved Ads
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Filters Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Filters</h2>
            
            {/* Filter Groups */}
            <div className="space-y-4">
              {/* Performance */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-gray-600 hover:text-gray-900"
                >
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                    Performance
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Ad Format */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-gray-600 hover:text-gray-900"
                >
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                    Ad Format
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-gray-600 hover:text-gray-900"
                >
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-2" />
                    Status
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-gray-600 hover:text-gray-900"
                >
                  <span className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2" />
                    Categories
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
