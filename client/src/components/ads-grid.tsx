import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { type Ad } from "@shared/types";
import { Calendar, DollarSign, Users } from "lucide-react";

interface AdsGridProps {
  ads: Ad[];
  isLoading: boolean;
}

export function AdsGrid({ ads, isLoading }: AdsGridProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <Card key={ad.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">{ad.page_name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="h-[200px] mb-4">
              <p className="text-sm text-muted-foreground">
                {ad.ad_creative_bodies?.[0] || "No ad content available"}
              </p>
              {ad.bylines && ad.bylines.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  By: {ad.bylines.join(", ")}
                </p>
              )}
            </ScrollArea>

            <div className="mt-auto space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Started: {new Date(ad.ad_delivery_start_time).toLocaleDateString()}</span>
              </div>

              {ad.spend && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    Spent: {ad.spend.lower_bound}-{ad.spend.upper_bound} {ad.currency}
                  </span>
                </div>
              )}

              {ad.impressions && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    Impressions: {ad.impressions.lower_bound}-{ad.impressions.upper_bound}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}