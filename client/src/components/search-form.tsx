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
  countries: z.array(z.string()).min(1, "At least one country must be selected"),
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {field.value.length} location(s) selected
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("ALL")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(["ALL"]);
                        } else {
                          field.onChange([]);
                        }
                      }}
                    >
                      All Countries
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Regions</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("EU")}
                      onCheckedChange={(checked) => {
                        const euCountries = ["GB", "FR", "DE", "IT", "ES", "NL", "SE", "NO", "DK", "FI", "PL"];
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "EU"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "EU"));
                        }
                      }}
                    >
                      Europe (EU)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("LATAM")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "LATAM"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "LATAM"));
                        }
                      }}
                    >
                      Latin America (LATAM)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Countries</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("US")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "US"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "US"));
                        }
                      }}
                    >
                      United States (US)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("GB")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "GB"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "GB"));
                        }
                      }}
                    >
                      United Kingdom (GB)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("FR")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "FR"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "FR"));
                        }
                      }}
                    >
                      France (FR)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("DE")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "DE"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "DE"));
                        }
                      }}
                    >
                      Germany (DE)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value.includes("BR")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...new Set([...field.value.filter(c => c !== "ALL"), "BR"])]);
                        } else {
                          field.onChange(field.value.filter(c => c !== "BR"));
                        }
                      }}
                    >
                      Brazil (BR)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => field.onChange([])}
                    >
                      Clear All
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
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