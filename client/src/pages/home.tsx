import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "@/components/search-form";
import { AdsGrid } from "@/components/ads-grid";
import { ConnectionTest } from "@/components/connection-test";
import { type Ad } from "@shared/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<{
    search_terms: string;
    ad_type: string;
    country: string;
    ad_active_status: string;
  } | null>(null);

  const { data: ads, isLoading } = useQuery<Ad[]>({
    queryKey: ['/api/ads', searchParams],
    enabled: !!searchParams,
    queryFn: async () => {
      if (!searchParams) return [];
      const url = `/api/ads?${new URLSearchParams({
        search_terms: searchParams.search_terms,
        ad_type: searchParams.ad_type,
        country: searchParams.country,
        ad_active_status: searchParams.ad_active_status,
      })}`;
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

  const handleSearch = (data: { search_terms: string; ad_type: string; country: string; ad_active_status: string }) => {
    setSearchParams(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Facebook Ads Library Browser
          </h1>

          <div className="mb-6">
            <ConnectionTest />
          </div>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-8">
          {searchParams && (
            <AdsGrid ads={ads || []} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}