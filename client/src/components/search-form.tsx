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
  country: z.string().min(2, "Country is required"),
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
      country: "US",
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
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Target Location</FormLabel>
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="US"
                      checked={field.value === "US"}
                      onChange={(e) => field.onChange(e.target.checked ? "US" : "")}
                      className="h-4 w-4"
                    />
                    <span>United States</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="GB"
                      checked={field.value === "GB"}
                      onChange={(e) => field.onChange(e.target.checked ? "GB" : "")}
                      className="h-4 w-4"
                    />
                    <span>United Kingdom</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="CA"
                      checked={field.value === "CA"}
                      onChange={(e) => field.onChange(e.target.checked ? "CA" : "")}
                      className="h-4 w-4"
                    />
                    <span>Canada</span>
                  </label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-2 col-span-2"
                    onClick={() => field.onChange("")}
                  >
                    Clear Selection
                  </Button>
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