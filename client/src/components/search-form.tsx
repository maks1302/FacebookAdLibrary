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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

const searchSchema = z.object({
  search_terms: z.string().min(1, "Search terms are required"),
  ad_type: z.enum(["ALL", "POLITICAL_AND_ISSUE_ADS"]),
  countries: z.array(z.string()).min(1, "Select at least one country"),
  ad_active_status: z.enum(["ACTIVE", "ALL", "INACTIVE"]),
  ad_delivery_date_min: z.string().optional(),
  ad_delivery_date_max: z.string().optional(),
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
      countries: ["ALL"],
      ad_active_status: "ALL",
      ad_delivery_date_min: undefined,
      ad_delivery_date_max: undefined,
    },

const regions = {
  ALL: { name: "All Countries", countries: ["ALL"] },
  EU: { 
    name: "Europe",
    countries: ["GB", "FR", "DE", "IT", "ES", "NL", "BE", "PT", "IE", "DK", "SE", "NO", "FI", "PL", "CZ", "HU", "AT", "CH", "GR", "RO"]
  },
  LATAM: {
    name: "Latin America",
    countries: ["BR", "AR", "CO", "MX", "CL", "PE", "VE", "EC", "UY", "PY", "BO"]
  },
  ASIA: {
    name: "Asia",
    countries: ["JP", "KR", "CN", "IN", "ID", "MY", "SG", "TH", "VN", "PH"]
  },
  NA: {
    name: "North America",
    countries: ["US", "CA"]
  },
  OCE: {
    name: "Oceania",
    countries: ["AU", "NZ"]
  }
};

const countryNames = {
  ALL: "All Countries",
  US: "United States", GB: "United Kingdom", FR: "France", DE: "Germany", 
  IT: "Italy", ES: "Spain", NL: "Netherlands", BE: "Belgium", PT: "Portugal",
  IE: "Ireland", DK: "Denmark", SE: "Sweden", NO: "Norway", FI: "Finland",
  PL: "Poland", CZ: "Czech Republic", HU: "Hungary", AT: "Austria", 
  CH: "Switzerland", GR: "Greece", RO: "Romania", BR: "Brazil", AR: "Argentina",
  CO: "Colombia", MX: "Mexico", CL: "Chile", PE: "Peru", VE: "Venezuela",
  EC: "Ecuador", UY: "Uruguay", PY: "Paraguay", BO: "Bolivia", JP: "Japan",
  KR: "South Korea", CN: "China", IN: "India", ID: "Indonesia", MY: "Malaysia",
  SG: "Singapore", TH: "Thailand", VN: "Vietnam", PH: "Philippines",
  AU: "Australia", NZ: "New Zealand", CA: "Canada"
};
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
        <FormField
          control={form.control}
          name="search_terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search Terms</FormLabel>
              <FormControl>
                <Input placeholder="Enter keywords..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ad_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ad type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ALL">All Ads</SelectItem>
                    <SelectItem value="POLITICAL_AND_ISSUE_ADS">Political & Issue Ads</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Location</FormLabel>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Select Countries</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => field.onChange([])}
                      size="sm"
                    >
                      Deselect All
                    </Button>
                  </div>
                  
                  {Object.entries(regions).map(([regionKey, region]) => (
                    <div key={regionKey} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={region.countries.every(c => field.value.includes(c))}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? Array.from(new Set([...field.value, ...region.countries]))
                              : field.value.filter(c => !region.countries.includes(c));
                            field.onChange(newValue);
                          }}
                        />
                        <span className="font-medium">{region.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-6">
                        {region.countries.map(country => (
                          <div key={country} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value.includes(country)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, country]
                                  : field.value.filter(c => c !== country);
                                field.onChange(newValue);
                              }}
                            />
                            <span>{countryNames[country]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ad_active_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ad_delivery_date_min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ad_delivery_date_max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            "Searching..."
          ) : (
            <>
              <SearchIcon className="mr-2 h-4 w-4" />
              Search Ads
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}