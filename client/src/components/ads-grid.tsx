import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type Ad } from "@shared/types";
import {
  CalendarDays,
  Globe2,
  Users,
  Target,
  DollarSign,
  Eye,
  BarChart3,
  Languages,
  Share2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AdsGridProps {
  ads: Ad[];
  isLoading: boolean;
}

export function AdsGrid({ ads, isLoading }: AdsGridProps) {
  const [loadingPreviews, setLoadingPreviews] = useState<Record<string, boolean>>({});
  const [previewErrors, setPreviewErrors] = useState<Record<string, string>>({});

  const handlePreviewLoad = (adId: string) => {
    setLoadingPreviews((prev) => ({ ...prev, [adId]: false }));
  };

  const handlePreviewError = (adId: string) => {
    setLoadingPreviews((prev) => ({ ...prev, [adId]: false }));
    setPreviewErrors((prev) => ({
      ...prev,
      [adId]: "Failed to load ad preview",
    }));
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount?: { lower_bound: number; upper_bound: number }, currency?: string) => {
    if (!amount || !currency) return "";
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    });
    return `${formatter.format(amount.lower_bound)} - ${formatter.format(amount.upper_bound)}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const formatAgeRange = (ages: string[]): string[] => {
    if (!ages || ages.length === 0) return [];
    
    // Convert to numbers and sort
    const numbers = ages.map(age => parseInt(age)).sort((a, b) => a - b);
    
    // For demographics, we'll just show the min-max range
    const min = numbers[0];
    const max = numbers[numbers.length - 1];
    return [`${min}-${max}`];
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center text-muted-foreground">
          No ads found. Try adjusting your search criteria.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <Card key={ad.id} className="flex flex-col overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-[800px] bg-gradient-to-b from-white to-gray-50/30">
          <CardHeader className="py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50/30 border-b border-blue-100/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <CardTitle className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  {ad.page_name}
                </CardTitle>
                <p className="text-sm text-muted-foreground/80">
                  ID: {ad.id}
                </p>
              </div>
              {ad.ad_snapshot_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 ml-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => window.open(ad.ad_snapshot_url, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 text-blue-500" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col">
            {/* Ad Preview */}
            {ad.ad_snapshot_url && (
              <div className="relative bg-gradient-to-b from-gray-50 to-white border-b h-[400px]">
                <div className="absolute inset-0">
                  {loadingPreviews[ad.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <Skeleton className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-100" />
                    </div>
                  )}
                  {previewErrors[ad.id] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-b from-gray-50 to-white">
                      <p className="text-xs">{previewErrors[ad.id]}</p>
                    </div>
                  ) : (
                    <iframe
                      src={`/api/ad-preview?url=${encodeURIComponent(ad.ad_snapshot_url)}`}
                      className="w-full h-full"
                      style={{
                        border: 'none',
                        backgroundColor: 'white',
                      }}
                      title={`Facebook Ad ${ad.id}`}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      onLoad={() => handlePreviewLoad(ad.id)}
                      onError={() => handlePreviewError(ad.id)}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 p-3">
              {/* Ad Content */}
              <div className="space-y-3">
                {/* Top Row: Timeline and Performance */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Timeline */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded-full bg-blue-50">
                        <CalendarDays className="h-3 w-3 text-blue-500" />
                      </div>
                      <span className="text-xs font-medium text-blue-900">Timeline</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-6">
                      <div className="space-y-0.5">
                        <p className="text-xs text-blue-600/70">Start</p>
                        <p className="text-sm">{formatDate(ad.ad_delivery_start_time)}</p>
                      </div>
                      {ad.ad_delivery_stop_time && (
                        <div className="space-y-0.5">
                          <p className="text-xs text-blue-600/70">End</p>
                          <p className="text-sm">{formatDate(ad.ad_delivery_stop_time)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded-full bg-emerald-50">
                        <BarChart3 className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-xs font-medium text-emerald-900">Performance</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-6">
                      {ad.spend && (
                        <div className="space-y-0.5 p-1.5 rounded-md bg-gradient-to-br from-emerald-50/50 to-transparent">
                          <div className="flex items-center gap-1 text-xs text-emerald-600/70">
                            <DollarSign className="h-3 w-3" />
                            <span>Spend</span>
                          </div>
                          <p className="text-sm">{formatCurrency(ad.spend, ad.currency)}</p>
                        </div>
                      )}
                      {ad.impressions && (
                        <div className="space-y-0.5 p-1.5 rounded-md bg-gradient-to-br from-emerald-50/50 to-transparent">
                          <div className="flex items-center gap-1 text-xs text-emerald-600/70">
                            <Eye className="h-3 w-3" />
                            <span>Views</span>
                          </div>
                          <p className="text-sm">
                            {formatNumber(ad.impressions.lower_bound)} - {formatNumber(ad.impressions.upper_bound)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="bg-gradient-to-r from-purple-100 to-transparent" />

                {/* Targeting Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-full bg-purple-50">
                      <Target className="h-3 w-3 text-purple-500" />
                    </div>
                    <span className="text-xs font-medium text-purple-900">Targeting</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-6">
                    {/* Demographics */}
                    {(ad.target_ages?.length > 0 || ad.target_gender) && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-purple-600/70">
                          <Users className="h-3 w-3" />
                          <span>Demographics</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {formatAgeRange(ad.target_ages || []).map((ageRange) => (
                            <Badge key={ageRange} variant="secondary" className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100">
                              {ageRange}
                            </Badge>
                          ))}
                          {ad.target_gender && (
                            <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100">
                              {ad.target_gender}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {ad.languages && ad.languages.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-purple-600/70">
                          <Languages className="h-2.5 w-2.5" />
                          <span>Languages</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {ad.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Locations */}
                    {ad.target_locations && ad.target_locations.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-purple-600/70">
                          <Globe2 className="h-2.5 w-2.5" />
                          <span>Locations</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {ad.target_locations.map((location) => (
                            <Badge
                              key={location.name}
                              variant={location.excluded ? "destructive" : "secondary"}
                              className={`px-2 py-0.5 text-xs ${
                                location.excluded 
                                  ? "bg-red-50 text-red-600 hover:bg-red-100" 
                                  : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                              }`}
                            >
                              {location.excluded && "❌ "}
                              {location.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Platforms */}
                    {ad.publisher_platforms && ad.publisher_platforms.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[10px] text-purple-600/70">
                          <Share2 className="h-2.5 w-2.5" />
                          <span>Platforms</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {ad.publisher_platforms.map((platform) => (
                            <Badge key={platform} variant="secondary" className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Distribution Data */}
                {(ad.demographic_distribution?.length > 0 || ad.delivery_by_region?.length > 0) && (
                  <>
                    <Separator className="bg-gradient-to-r from-orange-100 to-transparent" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-full bg-orange-50">
                          <BarChart3 className="h-3 w-3 text-orange-500" />
                        </div>
                        <span className="text-xs font-medium text-orange-900">Distribution</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-6">
                        {/* Demographic Distribution */}
                        {ad.demographic_distribution && ad.demographic_distribution.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-[10px] text-orange-600/70">Demographics</p>
                            <div className="grid grid-cols-1 gap-1">
                              {ad.demographic_distribution.map((dist, i) => (
                                <div key={i} className="flex justify-between items-center p-1.5 rounded-sm bg-orange-50/50">
                                  <span className="text-xs">{dist.gender} {dist.age}</span>
                                  <Badge variant="secondary" className="px-1.5 h-5 text-xs bg-orange-100 text-orange-600">
                                    {(dist.percentage * 100).toFixed(1)}%
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Regional Distribution */}
                        {ad.delivery_by_region && ad.delivery_by_region.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-[10px] text-orange-600/70">Regions</p>
                            <div className="grid grid-cols-1 gap-1">
                              {ad.delivery_by_region.map((region, i) => (
                                <div key={i} className="flex justify-between items-center p-1.5 rounded-sm bg-orange-50/50">
                                  <span className="text-xs">{region.region}</span>
                                  <Badge variant="secondary" className="px-1.5 h-5 text-xs bg-orange-100 text-orange-600">
                                    {(region.percentage * 100).toFixed(1)}%
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}