import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type Ad } from "@shared/types";
import {
  Calendar,
  DollarSign,
  Users,
  Globe,
  Target,
  Languages,
  ExternalLink,
  Clock,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AdsGridProps {
  ads: Ad[];
  isLoading: boolean;
}

function summarizeTargetLocations(locations?: Ad['target_locations']) {
  if (!locations || locations.length === 0) return null;

  const includedLocations = locations.filter(loc => !loc.excluded);
  if (includedLocations.length === 0) return null;

  const countries = new Set(includedLocations.map(loc => loc.name));
  const summary = Array.from(countries).join(", ");

  return summary.length > 50 ? `${summary.slice(0, 47)}...` : summary;
}

export function AdsGrid({ ads, isLoading }: AdsGridProps) {
  const [loadingPreviews, setLoadingPreviews] = useState<Record<string, boolean>>({});
  const [previewErrors, setPreviewErrors] = useState<Record<string, string>>({});

  const handlePreviewLoad = (adId: string) => {
    setLoadingPreviews(prev => ({ ...prev, [adId]: false }));
    setPreviewErrors(prev => ({ ...prev, [adId]: '' }));
  };

  const handlePreviewError = (adId: string) => {
    setLoadingPreviews(prev => ({ ...prev, [adId]: false }));
    setPreviewErrors(prev => ({ ...prev, [adId]: 'Failed to load preview' }));
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
        <Card key={ad.id} className="flex flex-col">
          <CardHeader className="py-2 px-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{ad.page_name}</CardTitle>
              {ad.ad_snapshot_url && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => window.open(ad.ad_snapshot_url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  View
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Ad Preview */}
            {ad.ad_snapshot_url && (
              <div className="relative flex justify-center">
                <div className="max-w-[700px] h-[864px] rounded-none bg-white">
                  {loadingPreviews[ad.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <Skeleton className="w-full h-full" />
                    </div>
                  )}
                  {previewErrors[ad.id] ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p>{previewErrors[ad.id]}</p>
                    </div>
                  ) : (
                    <iframe
                      src={`/api/ad-preview?url=${encodeURIComponent(ad.ad_snapshot_url)}`}
                      className="w-full h-full"
                      style={{
                        border: 'none',
                        width: '100%',
                        height: '100%',
                        transform: 'none',
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

            <div className="p-3 space-y-2">
              <ScrollArea className="h-[120px]">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {ad.ad_creative_bodies?.[0] || "No ad content available"}
                  </p>
                  {ad.ad_creative_link_titles?.[0] && (
                    <p className="text-xs font-medium">
                      {ad.ad_creative_link_titles[0]}
                    </p>
                  )}
                  {ad.ad_creative_link_descriptions?.[0] && (
                    <p className="text-xs text-muted-foreground">
                      {ad.ad_creative_link_descriptions[0]}
                    </p>
                  )}
                  {ad.bylines && ad.bylines.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      By: {ad.bylines.join(", ")}
                    </p>
                  )}
                </div>
              </ScrollArea>

              <div className="text-xs divide-y">
                <div className="space-y-0.5 pb-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Created: {new Date(ad.ad_creation_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Active: {new Date(ad.ad_delivery_start_time).toLocaleDateString()}
                      {ad.ad_delivery_stop_time && ` - ${new Date(ad.ad_delivery_stop_time).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5 py-1">
                  {ad.spend && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>
                        Spent: {ad.spend.lower_bound}-{ad.spend.upper_bound} {ad.currency}
                      </span>
                    </div>
                  )}
                  {ad.impressions && (
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>
                        Impressions: {ad.impressions.lower_bound}-{ad.impressions.upper_bound}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-0.5 pt-1">
                  {ad.target_gender && (
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Target: {ad.target_gender}</span>
                      {ad.target_ages && (
                        <span>({ad.target_ages.join(", ")} years)</span>
                      )}
                    </div>
                  )}
                  {ad.languages && ad.languages.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Languages className="h-3 w-3" />
                      <span>Languages: {ad.languages.join(", ")}</span>
                    </div>
                  )}
                  {ad.publisher_platforms && ad.publisher_platforms.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>Platforms: {ad.publisher_platforms.join(", ")}</span>
                    </div>
                  )}
                  {ad.target_locations && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>Locations: {summarizeTargetLocations(ad.target_locations)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}