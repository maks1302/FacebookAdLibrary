import React, { useState, useCallback, useMemo } from 'react';
import { Ad } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from 'date-fns';
import { Separator } from "@/components/ui/separator";
import { 
  Globe2, Users, Calendar, TrendingUp, Eye, Building2, 
  BarChart3, Languages, Monitor, Clock, Info, ChevronDown,
  Share2, ExternalLink, ChevronRight, Target, Bookmark,
  Copy, Download, Filter, SlidersHorizontal, Maximize2,
  PieChart, ArrowUpRight, MessageCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdsGridProps {
  ads: Ad[];
  isLoading?: boolean;
  onSaveAd?: (ad: Ad) => void;
  onShareAd?: (ad: Ad) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};

function MetricBadge({ icon: Icon, label, value, tooltip, trend }: { 
  icon: any, 
  label: string, 
  value: string, 
  tooltip?: string,
  trend?: { value: number; label: string } 
}) {
  const content = (
    <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
      <Icon className="h-3.5 w-3.5 text-gray-400" />
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
      {trend && (
        <span className={cn(
          "ml-1 flex items-center text-[10px]",
          trend.value > 0 ? "text-green-600" : "text-red-600"
        )}>
          <ArrowUpRight className={cn(
            "h-3 w-3",
            trend.value < 0 && "transform rotate-180"
          )} />
          {Math.abs(trend.value)}%
        </span>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

function AdInsightsDialog({ ad }: { ad: Ad }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <PieChart className="h-4 w-4" />
          Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ad Insights</DialogTitle>
          <DialogDescription>
            Detailed analytics and insights for this advertisement
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="demographics" className="mt-4">
          <TabsList>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {ad.demographic_distribution?.map((demo, index) => {
                const percentage = demo.percentage * 100;
                return (
                  <motion.div
                    key={index}
                    {...scaleIn}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border bg-card"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{demo.gender} - {demo.age}</span>
                      <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="regions">
            {/* Add region visualization here */}
          </TabsContent>
          <TabsContent value="performance">
            {/* Add performance metrics here */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ShareDialog({ ad, onShare }: { ad: Ad; onShare?: (ad: Ad) => void }) {
  const [note, setNote] = useState("");
  
  const handleShare = useCallback(() => {
    onShare?.(ad);
    // Additional share logic
  }, [ad, onShare]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Advertisement</DialogTitle>
          <DialogDescription>
            Share this ad with your team or export its data
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Add a note</Label>
            <Input
              placeholder="Optional note about this ad..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handleShare} className="w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              Share with Team
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdCard({ ad, onSave, onShare }: { ad: Ad; onSave?: (ad: Ad) => void; onShare?: (ad: Ad) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaved(!isSaved);
    onSave?.(ad);
  }, [ad, isSaved, onSave]);

  const creationDate = useMemo(() => {
    return formatDistanceToNow(new Date(ad.ad_creation_time), { addSuffix: true });
  }, [ad.ad_creation_time]);

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
    >
      <Card className="group bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:line-clamp-none transition-all">
                  {ad.page_name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <ShareDialog ad={ad} onShare={onShare} />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleSave}
                  >
                    <Bookmark 
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isSaved && "fill-current text-blue-500"
                      )} 
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Filter className="h-4 w-4 mr-2" />
                        Find Similar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Info className="h-3.5 w-3.5" />
                <span>ID: {ad.id}</span>
                <span>•</span>
                <span>{creationDate}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Media Content */}
          {ad.ad_snapshot_url && (
            <div className="relative h-48 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow">
              <img
                src={ad.ad_snapshot_url}
                alt={`Ad ${ad.id}`}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/80">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/80">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Ad Creative Content */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <div className="space-y-3">
              {ad.ad_creative_bodies?.slice(0, isExpanded ? undefined : 1).map((body, index) => (
                <motion.p 
                  key={index}
                  initial={false}
                  animate={{ height: 'auto' }}
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {body}
                </motion.p>
              ))}
              {ad.ad_creative_link_titles?.map((title, index) => (
                <p key={index} className="text-sm font-medium text-gray-900">{title}</p>
              ))}
              {ad.ad_creative_link_captions?.map((caption, index) => (
                <p key={index} className="text-sm text-gray-500">{caption}</p>
              ))}
            </div>
            {(ad.ad_creative_bodies?.length || 0) > 1 && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  {isExpanded ? "Show less" : "Show more"}
                  <ChevronDown className={cn(
                    "h-4 w-4 ml-2 transition-transform duration-200",
                    isExpanded && "transform rotate-180"
                  )} />
                </Button>
              </CollapsibleTrigger>
            )}
          </Collapsible>

          {/* Bylines */}
          {ad.bylines && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span>{Array.isArray(ad.bylines) ? ad.bylines.join(', ') : ad.bylines}</span>
            </div>
          )}

          {/* Target Demographics */}
          {(ad.target_ages || ad.target_gender || ad.target_locations || ad.languages || ad.publisher_platforms) && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Target className="h-4 w-4" />
                    <span>Targeting</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-3">
                {/* Platforms & Languages */}
                <div className="space-y-2">
                  {ad.publisher_platforms && (
                    <div className="flex items-start gap-1.5">
                      <Monitor className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-700 mb-1">Platforms:</div>
                        <div className="flex flex-wrap gap-1">
                          {ad.publisher_platforms.map(platform => (
                            <Badge 
                              key={platform} 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {ad.languages && ad.languages.length > 0 && (
                    <div className="flex items-start gap-1.5">
                      <Languages className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-700 mb-1">Languages:</div>
                        <div className="flex flex-wrap gap-1">
                          {ad.languages.map(lang => (
                            <Badge 
                              key={lang} 
                              variant="outline" 
                              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Demographics */}
                <div className="flex flex-wrap gap-2">
                  {ad.target_ages && (
                    <MetricBadge 
                      icon={Calendar}
                      label="Age"
                      value={ad.target_ages.join(', ')}
                    />
                  )}
                  {ad.target_gender && (
                    <MetricBadge 
                      icon={Users}
                      label="Gender"
                      value={ad.target_gender}
                    />
                  )}
                </div>

                {/* Locations */}
                {ad.target_locations && (
                  <div className="flex items-start gap-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
                    <Globe2 className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium mb-1">Target Locations:</div>
                      <div className="flex flex-wrap gap-1">
                        {ad.target_locations.map(loc => (
                          <motion.span 
                            key={loc.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                              "inline-flex items-center px-1.5 py-0.5 rounded",
                              loc.excluded 
                                ? 'bg-red-50 text-red-700 border border-red-200' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            )}
                          >
                            {loc.name}
                            {loc.excluded && ' (excluded)'}
                            {loc.num_obfuscated > 0 && (
                              <Badge variant="secondary" className="ml-1 text-[10px] px-1">
                                +{loc.num_obfuscated}
                              </Badge>
                            )}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Categories */}
          {ad.categories && ad.categories.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Categories</div>
              <div className="flex flex-wrap gap-1.5">
                {ad.categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 cursor-pointer"
                    >
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pt-4">
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {/* Dates */}
              <MetricBadge 
                icon={Calendar}
                label="Start"
                value={format(new Date(ad.ad_delivery_start_time), 'MMM d, yyyy')}
              />
              {ad.ad_delivery_stop_time && (
                <MetricBadge 
                  icon={Calendar}
                  label="End"
                  value={format(new Date(ad.ad_delivery_stop_time), 'MMM d, yyyy')}
                />
              )}
              
              {/* Spend */}
              {ad.spend && (
                <MetricBadge 
                  icon={TrendingUp}
                  label="Spend"
                  value={`${ad.currency} ${ad.spend.lower_bound}-${ad.spend.upper_bound}`}
                  tooltip="Estimated spend range"
                  trend={{ value: 12.5, label: "vs. last period" }}
                />
              )}
              
              {/* Impressions */}
              {ad.impressions && (
                <MetricBadge 
                  icon={Eye}
                  label="Impressions"
                  value={`${ad.impressions.lower_bound.toLocaleString()}-${ad.impressions.upper_bound.toLocaleString()}`}
                  tooltip="Estimated impression range"
                  trend={{ value: -5.2, label: "vs. last period" }}
                />
              )}
            </div>
            <AdInsightsDialog ad={ad} />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function AdsGrid({ ads, isLoading = false, onSaveAd, onShareAd }: AdsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="animate-pulse bg-white border-0 shadow-md">
              <CardHeader className="space-y-2">
                <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded-md"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!ads.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100"
      >
        <h3 className="text-xl font-semibold text-gray-900">No ads found</h3>
        <p className="mt-2 text-sm text-gray-600">
          Try adjusting your search criteria to find more results.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {ads.map((ad) => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            onSave={onSaveAd}
            onShare={onShareAd}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}