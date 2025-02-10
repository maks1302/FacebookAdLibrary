import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "@/components/search-form";
import { AdsGrid } from "@/components/ads-grid";
import { ConnectionTest } from "@/components/connection-test";
import { type Ad } from "@shared/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<{
    search_terms: string;
    search_type: string;
    ad_type: string;
    country: string[];
    ad_active_status: string;
    media_type: string;
    ad_delivery_date_min?: string;
    ad_delivery_date_max?: string;
  } | null>(null);

  const queryParams = searchParams ? {
    search_terms: searchParams.search_terms,
    ad_type: searchParams.ad_type,
    country: searchParams.country,
    ad_active_status: searchParams.ad_active_status,
    media_type: searchParams.media_type,
    ad_delivery_date_min: searchParams.ad_delivery_date_min,
    ad_delivery_date_max: searchParams.ad_delivery_date_max,
  } : null;

  const { data: ads, isLoading } = useQuery<Ad[]>({
    queryKey: ['/api/ads', searchParams],
    enabled: !!searchParams,
    queryFn: async () => {
      if (!searchParams) return [];
      const params = new URLSearchParams();
      params.append('search_terms', searchParams.search_terms);
      params.append('search_type', searchParams.search_type);
      params.append('ad_type', searchParams.ad_type);
      params.append('ad_active_status', searchParams.ad_active_status);
      const countries = Array.isArray(searchParams.country) ? searchParams.country : [searchParams.country];
      countries.forEach(c => params.append('country', c));
      if (searchParams.ad_delivery_date_min) {
        params.append('ad_delivery_date_min', searchParams.ad_delivery_date_min);
      }
      if (searchParams.ad_delivery_date_max) {
        params.append('ad_delivery_date_max', searchParams.ad_delivery_date_max);
      }
      if (searchParams.media_type) {
        params.append('media_type', searchParams.media_type);
      }
      const url = `/api/ads?${params}`;
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    gcTime: 0,
    retry: false,
  });

  const handleSearch = (data: { 
    search_terms: string; 
    ad_type: string; 
    country: string[]; 
    ad_active_status: string;
    ad_delivery_date_min?: string;
    ad_delivery_date_max?: string;
  }) => {
    setSearchParams(data);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Facebook Ads Library Browser
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore and analyze Facebook ads from around the world. Find inspiration,
              track competitors, and understand market trends.
            </p>
          </div>

          <div className="w-full max-w-3xl">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          <div className="w-full">
            <ConnectionTest />
          </div>
        </div>

        {/* Results Section */}
        {searchParams && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-3">
                <h2 className="text-lg font-semibold text-gray-900">Results</h2>
                {ads && (
                  <span className="text-sm text-gray-500">
                    {ads.length.toLocaleString()} ads found
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <AdsGrid ads={ads || []} isLoading={isLoading} />
          </div>
        )}
      </div>
    </main>
  );
}