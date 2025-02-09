import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronDown, CalendarIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, Info } from "lucide-react";

const searchSchema = z.object({
  search_terms: z.string().min(1, "Search terms are required"),
  ad_type: z.enum(["ALL", "POLITICAL_AND_ISSUE_ADS"]),
  country: z.array(z.string()).min(1, "At least one country is required").transform(val => Array.isArray(val) ? val : [val]),
  ad_active_status: z.enum(["ACTIVE", "ALL", "INACTIVE"]),
  ad_delivery_date_min: z.string().optional(),
  ad_delivery_date_max: z.string().optional(),
  media_type: z.enum(["ALL", "IMAGE", "MEME", "VIDEO", "NONE"]).default("ALL"), //Added media_type field
  search_type: z.enum(["KEYWORD_UNORDERED", "KEYWORD_EXACT_PHRASE"]).default("KEYWORD_EXACT_PHRASE"), // Added search_type field
});

interface SearchFormProps {
  onSearch: (data: z.infer<typeof searchSchema>) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search_terms: "",
      ad_type: "ALL",
      country: [
        "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AN", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", 
        "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", 
        "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", 
        "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", 
        "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", 
        "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", 
        "IL", "IM", "IN", "IO", "IQ", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", 
        "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", 
        "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", 
        "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", 
        "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", 
        "RS", "RU", "RW", "SA", "SB", "SC", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", 
        "SS", "ST", "SV", "SX", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", 
        "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", 
        "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"
      ],
      ad_active_status: "ALL",
      ad_delivery_date_min: undefined,
      ad_delivery_date_max: undefined,
      media_type: "ALL", // Added default value for media_type
      search_type: "KEYWORD_EXACT_PHRASE", // Set exact phrase as default
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="w-full">
        {/* Main Search Bar */}
        <div className="relative w-full mb-4">
          <FormField
            control={form.control}
            name="search_terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500" />
                    <Input 
                      placeholder="Search ads by keyword, advertiser, or topic..." 
                      {...field}
                      className="w-full h-12 pl-12 pr-32 text-lg rounded-xl border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20" 
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <Button 
                        type="submit" 
                        size="sm"
                        disabled={isLoading}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        {isLoading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Advanced Search Options */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <ChevronDown className="h-4 w-4" />
              Advanced Filters
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">
            {/* Search Type Toggle */}
            <FormField
              control={form.control}
              name="search_type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        checked={field.value === "KEYWORD_EXACT_PHRASE"}
                        onChange={(e) => field.onChange(e.target.checked ? "KEYWORD_EXACT_PHRASE" : "KEYWORD_UNORDERED")}
                        className="h-4 w-4"
                      />
                      <span className="text-sm font-medium text-gray-700">Exact Phrase Match</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[350px]">
                            <p>When checked, search for the exact phrase. When unchecked, search for any of the words in any order.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Main Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ad Type */}
              <FormField
                control={form.control}
                name="ad_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Ad Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select ad type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ALL">All Ads</SelectItem>
                        <SelectItem value="POLITICAL_AND_ISSUE_ADS">Political & Issue Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Ad Status */}
              <FormField
                control={form.control}
                name="ad_active_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Media Type */}
              <FormField
                control={form.control}
                name="media_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Media Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        <SelectItem value="IMAGE">Image</SelectItem>
                        <SelectItem value="VIDEO">Video</SelectItem>
                        <SelectItem value="MEME">Meme</SelectItem>
                        <SelectItem value="NONE">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Location Section */}
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">Target Location</FormLabel>
                    <div className="flex flex-wrap items-center gap-2">
                      <Select
                        onValueChange={(value) => {
                          const euCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
                          const latamCountries = ["AR", "BO", "BR", "CL", "CO", "CR", "DO", "EC", "SV", "GT", "HT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "UY", "VE"];
                          const aseanCountries = ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "VN"];
                          const naftaCountries = ["US", "CA", "MX"];
                          
                          switch(value) {
                            case "EU":
                              field.onChange(euCountries);
                              break;
                            case "LATAM":
                              field.onChange(latamCountries);
                              break;
                            case "ASEAN":
                              field.onChange(aseanCountries);
                              break;
                            case "NAFTA":
                              field.onChange(naftaCountries);
                              break;
                            case "ALL":
                              field.onChange(form.getValues().country);
                              break;
                          }
                        }}
                      >
                        <SelectTrigger className="w-[180px] shrink-0">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">All Countries</SelectItem>
                          <SelectItem value="EU">EU (27)</SelectItem>
                          <SelectItem value="LATAM">LATAM (20)</SelectItem>
                          <SelectItem value="ASEAN">ASEAN (10)</SelectItem>
                          <SelectItem value="NAFTA">NAFTA (3)</SelectItem>
                        </SelectContent>
                      </Select>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            <span>Selected Countries ({field.value.length})</span>
                            <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Input
                            placeholder="Search countries..."
                            className="m-2 w-[calc(100%-16px)]"
                            id="countrySearch"
                            onInput={(e) => {
                              const searchValue = e.currentTarget.value.toLowerCase();
                              const countryElements = document.querySelectorAll('.country-option');
                              countryElements.forEach((el) => {
                                const countryName = el.getAttribute('data-name')?.toLowerCase() || '';
                                if (countryName.includes(searchValue)) {
                                  (el as HTMLElement).style.display = 'flex';
                                } else {
                                  (el as HTMLElement).style.display = 'none';
                                }
                              });
                            }}
                          />
                          <div className="max-h-[300px] overflow-y-auto p-2">
                            {field.value.map((code) => (
                              <div
                                key={code}
                                className="country-option flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
                                data-name={code}
                              >
                                <span className="text-sm">{code}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newValue = field.value.filter(c => c !== code);
                                    field.onChange(newValue);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <FormLabel className="text-sm font-medium text-gray-700">Date Range</FormLabel>
              <div className="flex flex-wrap gap-2">
                <Select
                  onValueChange={(value) => {
                    const today = new Date();
                    switch (value) {
                      case "24h":
                        const yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        form.setValue('ad_delivery_date_min', yesterday.toISOString().split('T')[0]);
                        form.setValue('ad_delivery_date_max', today.toISOString().split('T')[0]);
                        break;
                      case "7d":
                        const sevenDaysAgo = new Date(today);
                        sevenDaysAgo.setDate(today.getDate() - 7);
                        form.setValue('ad_delivery_date_min', sevenDaysAgo.toISOString().split('T')[0]);
                        form.setValue('ad_delivery_date_max', today.toISOString().split('T')[0]);
                        break;
                      case "30d":
                        const thirtyDaysAgo = new Date(today);
                        thirtyDaysAgo.setDate(today.getDate() - 30);
                        form.setValue('ad_delivery_date_min', thirtyDaysAgo.toISOString().split('T')[0]);
                        form.setValue('ad_delivery_date_max', today.toISOString().split('T')[0]);
                        break;
                      case "90d":
                        const ninetyDaysAgo = new Date(today);
                        ninetyDaysAgo.setDate(today.getDate() - 90);
                        form.setValue('ad_delivery_date_min', ninetyDaysAgo.toISOString().split('T')[0]);
                        form.setValue('ad_delivery_date_max', today.toISOString().split('T')[0]);
                        break;
                      case "clear":
                        form.setValue('ad_delivery_date_min', undefined);
                        form.setValue('ad_delivery_date_max', undefined);
                        break;
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Quick select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="clear">Clear dates</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-[200px]">
                      {form.watch('ad_delivery_date_min') && form.watch('ad_delivery_date_max') ? (
                        `${format(new Date(form.watch('ad_delivery_date_min')), "MMM d")} - ${format(new Date(form.watch('ad_delivery_date_max')), "MMM d, yyyy")}`
                      ) : (
                        "Select custom dates"
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{
                        from: form.watch('ad_delivery_date_min') ? new Date(form.watch('ad_delivery_date_min')) : undefined,
                        to: form.watch('ad_delivery_date_max') ? new Date(form.watch('ad_delivery_date_max')) : undefined,
                      }}
                      onSelect={(range) => {
                        if (range?.from) {
                          form.setValue('ad_delivery_date_min', range.from.toISOString().split('T')[0]);
                        }
                        if (range?.to) {
                          form.setValue('ad_delivery_date_max', range.to.toISOString().split('T')[0]);
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </form>
    </Form>
  );
}