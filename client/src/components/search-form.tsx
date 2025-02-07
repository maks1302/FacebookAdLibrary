
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
  country: z.array(z.string()).min(1, "At least one country is required").transform(val => Array.isArray(val) ? val : [val]),
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
      country: [],
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
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const countries = [
                        { code: "AD", name: "Andorra" },
                        // ... all other countries
                      ].map(country => country.code);
                      field.onChange(countries);
                    }}
                  >
                    ALL
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const euCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
                      field.onChange(euCountries);
                    }}
                  >
                    EU
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const nafta = ["US", "CA", "MX"];
                      field.onChange(nafta);
                    }}
                  >
                    NAFTA
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const latamCountries = ["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GT", "HT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "UY", "VE"];
                      field.onChange(latamCountries);
                    }}
                  >
                    LATAM
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const aseanCountries = ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "VN"];
                      field.onChange(aseanCountries);
                    }}
                  >
                    ASEAN
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const countries = [
                        { code: "AD", name: "Andorra" },
                        { code: "AE", name: "United Arab Emirates" },
                        { code: "AF", name: "Afghanistan" },
                        { code: "AG", name: "Antigua and Barbuda" },
                        { code: "AI", name: "Anguilla" },
                        { code: "AL", name: "Albania" },
                        { code: "AM", name: "Armenia" },
                        { code: "AN", name: "Netherlands Antilles" },
                        { code: "AO", name: "Angola" },
                        { code: "AQ", name: "Antarctica" },
                        { code: "AR", name: "Argentina" },
                        { code: "AS", name: "American Samoa" },
                        { code: "AT", name: "Austria" },
                        { code: "AU", name: "Australia" },
                        { code: "AW", name: "Aruba" },
                        { code: "AX", name: "Åland Islands" },
                        { code: "AZ", name: "Azerbaijan" },
                        { code: "BA", name: "Bosnia and Herzegovina" },
                        { code: "BB", name: "Barbados" },
                        { code: "BD", name: "Bangladesh" },
                        { code: "BE", name: "Belgium" },
                        { code: "BF", name: "Burkina Faso" },
                        { code: "BG", name: "Bulgaria" },
                        { code: "BH", name: "Bahrain" },
                        { code: "BI", name: "Burundi" },
                        { code: "BJ", name: "Benin" },
                        { code: "BL", name: "Saint Barthélemy" },
                        { code: "BM", name: "Bermuda" },
                        { code: "BN", name: "Brunei" },
                        { code: "BO", name: "Bolivia" },
                        { code: "BQ", name: "Caribbean Netherlands" },
                        { code: "BR", name: "Brazil" },
                        { code: "BS", name: "Bahamas" },
                        { code: "BT", name: "Bhutan" },
                        { code: "BV", name: "Bouvet Island" },
                        { code: "BW", name: "Botswana" },
                        { code: "BY", name: "Belarus" },
                        { code: "BZ", name: "Belize" },
                        { code: "CA", name: "Canada" },
                        { code: "CC", name: "Cocos Islands" },
                        { code: "CD", name: "DR Congo" },
                        { code: "CF", name: "Central African Republic" },
                        { code: "CG", name: "Republic of the Congo" },
                        { code: "CH", name: "Switzerland" },
                        { code: "CI", name: "Ivory Coast" },
                        { code: "CK", name: "Cook Islands" },
                        { code: "CL", name: "Chile" },
                        { code: "CM", name: "Cameroon" },
                        { code: "CN", name: "China" },
                        { code: "CO", name: "Colombia" },
                        { code: "CR", name: "Costa Rica" },
                        { code: "CV", name: "Cape Verde" },
                        { code: "CW", name: "Curaçao" },
                        { code: "CX", name: "Christmas Island" },
                        { code: "CY", name: "Cyprus" },
                        { code: "CZ", name: "Czech Republic" },
                        { code: "DE", name: "Germany" },
                        { code: "DJ", name: "Djibouti" },
                        { code: "DK", name: "Denmark" },
                        { code: "DM", name: "Dominica" },
                        { code: "DO", name: "Dominican Republic" },
                        { code: "DZ", name: "Algeria" },
                        { code: "EC", name: "Ecuador" },
                        { code: "EE", name: "Estonia" },
                        { code: "EG", name: "Egypt" },
                        { code: "EH", name: "Western Sahara" },
                        { code: "ER", name: "Eritrea" },
                        { code: "ES", name: "Spain" },
                        { code: "ET", name: "Ethiopia" },
                        { code: "FI", name: "Finland" },
                        { code: "FJ", name: "Fiji" },
                        { code: "FK", name: "Falkland Islands" },
                        { code: "FM", name: "Micronesia" },
                        { code: "FO", name: "Faroe Islands" },
                        { code: "FR", name: "France" },
                        { code: "GA", name: "Gabon" },
                        { code: "GB", name: "United Kingdom" },
                        { code: "GD", name: "Grenada" },
                        { code: "GE", name: "Georgia" },
                        { code: "GF", name: "French Guiana" },
                        { code: "GG", name: "Guernsey" },
                        { code: "GH", name: "Ghana" },
                        { code: "GI", name: "Gibraltar" },
                        { code: "GL", name: "Greenland" },
                        { code: "GM", name: "Gambia" },
                        { code: "GN", name: "Guinea" },
                        { code: "GP", name: "Guadeloupe" },
                        { code: "GQ", name: "Equatorial Guinea" },
                        { code: "GR", name: "Greece" },
                        { code: "GS", name: "South Georgia" },
                        { code: "GT", name: "Guatemala" },
                        { code: "GU", name: "Guam" },
                        { code: "GW", name: "Guinea-Bissau" },
                        { code: "GY", name: "Guyana" },
                        { code: "HK", name: "Hong Kong" },
                        { code: "HM", name: "Heard Island" },
                        { code: "HN", name: "Honduras" },
                        { code: "HR", name: "Croatia" },
                        { code: "HT", name: "Haiti" },
                        { code: "HU", name: "Hungary" },
                        { code: "ID", name: "Indonesia" },
                        { code: "IE", name: "Ireland" },
                        { code: "IL", name: "Israel" },
                        { code: "IM", name: "Isle of Man" },
                        { code: "IN", name: "India" },
                        { code: "IO", name: "British Indian Ocean Territory" },
                        { code: "IQ", name: "Iraq" },
                        { code: "IS", name: "Iceland" },
                        { code: "IT", name: "Italy" },
                        { code: "JE", name: "Jersey" },
                        { code: "JM", name: "Jamaica" },
                        { code: "JO", name: "Jordan" },
                        { code: "JP", name: "Japan" },
                        { code: "KE", name: "Kenya" },
                        { code: "KG", name: "Kyrgyzstan" },
                        { code: "KH", name: "Cambodia" },
                        { code: "KI", name: "Kiribati" },
                        { code: "KM", name: "Comoros" },
                        { code: "KN", name: "Saint Kitts and Nevis" },
                        { code: "KR", name: "South Korea" },
                        { code: "KW", name: "Kuwait" },
                        { code: "KY", name: "Cayman Islands" },
                        { code: "KZ", name: "Kazakhstan" },
                        { code: "LA", name: "Laos" },
                        { code: "LB", name: "Lebanon" },
                        { code: "LC", name: "Saint Lucia" },
                        { code: "LI", name: "Liechtenstein" },
                        { code: "LK", name: "Sri Lanka" },
                        { code: "LR", name: "Liberia" },
                        { code: "LS", name: "Lesotho" },
                        { code: "LT", name: "Lithuania" },
                        { code: "LU", name: "Luxembourg" },
                        { code: "LV", name: "Latvia" },
                        { code: "LY", name: "Libya" },
                        { code: "MA", name: "Morocco" },
                        { code: "MC", name: "Monaco" },
                        { code: "MD", name: "Moldova" },
                        { code: "ME", name: "Montenegro" },
                        { code: "MF", name: "Saint Martin" },
                        { code: "MG", name: "Madagascar" },
                        { code: "MH", name: "Marshall Islands" },
                        { code: "MK", name: "North Macedonia" },
                        { code: "ML", name: "Mali" },
                        { code: "MM", name: "Myanmar" },
                        { code: "MN", name: "Mongolia" },
                        { code: "MO", name: "Macao" },
                        { code: "MP", name: "Northern Mariana Islands" },
                        { code: "MQ", name: "Martinique" },
                        { code: "MR", name: "Mauritania" },
                        { code: "MS", name: "Montserrat" },
                        { code: "MT", name: "Malta" },
                        { code: "MU", name: "Mauritius" },
                        { code: "MV", name: "Maldives" },
                        { code: "MW", name: "Malawi" },
                        { code: "MX", name: "Mexico" },
                        { code: "MY", name: "Malaysia" },
                        { code: "MZ", name: "Mozambique" },
                        { code: "NA", name: "Namibia" },
                        { code: "NC", name: "New Caledonia" },
                        { code: "NE", name: "Niger" },
                        { code: "NF", name: "Norfolk Island" },
                        { code: "NG", name: "Nigeria" },
                        { code: "NI", name: "Nicaragua" },
                        { code: "NL", name: "Netherlands" },
                        { code: "NO", name: "Norway" },
                        { code: "NP", name: "Nepal" },
                        { code: "NR", name: "Nauru" },
                        { code: "NU", name: "Niue" },
                        { code: "NZ", name: "New Zealand" },
                        { code: "OM", name: "Oman" },
                        { code: "PA", name: "Panama" },
                        { code: "PE", name: "Peru" },
                        { code: "PF", name: "French Polynesia" },
                        { code: "PG", name: "Papua New Guinea" },
                        { code: "PH", name: "Philippines" },
                        { code: "PK", name: "Pakistan" },
                        { code: "PL", name: "Poland" },
                        { code: "PM", name: "Saint Pierre and Miquelon" },
                        { code: "PN", name: "Pitcairn Islands" },
                        { code: "PR", name: "Puerto Rico" },
                        { code: "PS", name: "Palestine" },
                        { code: "PT", name: "Portugal" },
                        { code: "PW", name: "Palau" },
                        { code: "PY", name: "Paraguay" },
                        { code: "QA", name: "Qatar" },
                        { code: "RE", name: "Réunion" },
                        { code: "RO", name: "Romania" },
                        { code: "RS", name: "Serbia" },
                        { code: "RU", name: "Russia" },
                        { code: "RW", name: "Rwanda" },
                        { code: "SA", name: "Saudi Arabia" },
                        { code: "SB", name: "Solomon Islands" },
                        { code: "SC", name: "Seychelles" },
                        { code: "SE", name: "Sweden" },
                        { code: "SG", name: "Singapore" },
                        { code: "SH", name: "Saint Helena" },
                        { code: "SI", name: "Slovenia" },
                        { code: "SJ", name: "Svalbard and Jan Mayen" },
                        { code: "SK", name: "Slovakia" },
                        { code: "SL", name: "Sierra Leone" },
                        { code: "SM", name: "San Marino" },
                        { code: "SN", name: "Senegal" },
                        { code: "SO", name: "Somalia" },
                        { code: "SR", name: "Suriname" },
                        { code: "SS", name: "South Sudan" },
                        { code: "ST", name: "São Tomé and Príncipe" },
                        { code: "SV", name: "El Salvador" },
                        { code: "SX", name: "Sint Maarten" },
                        { code: "SZ", name: "Eswatini" },
                        { code: "TC", name: "Turks and Caicos Islands" },
                        { code: "TD", name: "Chad" },
                        { code: "TF", name: "French Southern Territories" },
                        { code: "TG", name: "Togo" },
                        { code: "TH", name: "Thailand" },
                        { code: "TJ", name: "Tajikistan" },
                        { code: "TK", name: "Tokelau" },
                        { code: "TL", name: "Timor-Leste" },
                        { code: "TM", name: "Turkmenistan" },
                        { code: "TN", name: "Tunisia" },
                        { code: "TO", name: "Tonga" },
                        { code: "TR", name: "Turkey" },
                        { code: "TT", name: "Trinidad and Tobago" },
                        { code: "TV", name: "Tuvalu" },
                        { code: "TW", name: "Taiwan" },
                        { code: "TZ", name: "Tanzania" },
                        { code: "UA", name: "Ukraine" },
                        { code: "UG", name: "Uganda" },
                        { code: "UM", name: "U.S. Minor Outlying Islands" },
                        { code: "US", name: "United States" },
                        { code: "UY", name: "Uruguay" },
                        { code: "UZ", name: "Uzbekistan" },
                        { code: "VA", name: "Vatican City" },
                        { code: "VC", name: "Saint Vincent and the Grenadines" },
                        { code: "VE", name: "Venezuela" },
                        { code: "VG", name: "British Virgin Islands" },
                        { code: "VI", name: "U.S. Virgin Islands" },
                        { code: "VN", name: "Vietnam" },
                        { code: "VU", name: "Vanuatu" },
                        { code: "WF", name: "Wallis and Futuna" },
                        { code: "WS", name: "Samoa" },
                        { code: "XK", name: "Kosovo" },
                        { code: "YE", name: "Yemen" },
                        { code: "YT", name: "Mayotte" },
                        { code: "ZA", name: "South Africa" },
                        { code: "ZM", name: "Zambia" },
                        { code: "ZW", name: "Zimbabwe" }
                      ];
                      field.onChange(countries.map(country => country.code));
                    }}
                  >
                    ALL
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-md p-4">
                  {[
                    { code: "AD", name: "Andorra" },
                    { code: "AE", name: "United Arab Emirates" },
                    { code: "AF", name: "Afghanistan" },
                    { code: "AG", name: "Antigua and Barbuda" },
                    { code: "AI", name: "Anguilla" },
                    { code: "AL", name: "Albania" },
                    { code: "AM", name: "Armenia" },
                    { code: "AN", name: "Netherlands Antilles" },
                    { code: "AO", name: "Angola" },
                    { code: "AQ", name: "Antarctica" },
                    { code: "AR", name: "Argentina" },
                    { code: "AS", name: "American Samoa" },
                    { code: "AT", name: "Austria" },
                    { code: "AU", name: "Australia" },
                    { code: "AW", name: "Aruba" },
                    { code: "AX", name: "Åland Islands" },
                    { code: "AZ", name: "Azerbaijan" },
                    { code: "BA", name: "Bosnia and Herzegovina" },
                    { code: "BB", name: "Barbados" },
                    { code: "BD", name: "Bangladesh" },
                    { code: "BE", name: "Belgium" },
                    { code: "BF", name: "Burkina Faso" },
                    { code: "BG", name: "Bulgaria" },
                    { code: "BH", name: "Bahrain" },
                    { code: "BI", name: "Burundi" },
                    { code: "BJ", name: "Benin" },
                    { code: "BL", name: "Saint Barthélemy" },
                    { code: "BM", name: "Bermuda" },
                    { code: "BN", name: "Brunei" },
                    { code: "BO", name: "Bolivia" },
                    { code: "BQ", name: "Caribbean Netherlands" },
                    { code: "BR", name: "Brazil" },
                    { code: "BS", name: "Bahamas" },
                    { code: "BT", name: "Bhutan" },
                    { code: "BV", name: "Bouvet Island" },
                    { code: "BW", name: "Botswana" },
                    { code: "BY", name: "Belarus" },
                    { code: "BZ", name: "Belize" },
                    { code: "CA", name: "Canada" },
                    { code: "CC", name: "Cocos Islands" },
                    { code: "CD", name: "DR Congo" },
                    { code: "CF", name: "Central African Republic" },
                    { code: "CG", name: "Republic of the Congo" },
                    { code: "CH", name: "Switzerland" },
                    { code: "CI", name: "Ivory Coast" },
                    { code: "CK", name: "Cook Islands" },
                    { code: "CL", name: "Chile" },
                    { code: "CM", name: "Cameroon" },
                    { code: "CN", name: "China" },
                    { code: "CO", name: "Colombia" },
                    { code: "CR", name: "Costa Rica" },
                    { code: "CV", name: "Cape Verde" },
                    { code: "CW", name: "Curaçao" },
                    { code: "CX", name: "Christmas Island" },
                    { code: "CY", name: "Cyprus" },
                    { code: "CZ", name: "Czech Republic" },
                    { code: "DE", name: "Germany" },
                    { code: "DJ", name: "Djibouti" },
                    { code: "DK", name: "Denmark" },
                    { code: "DM", name: "Dominica" },
                    { code: "DO", name: "Dominican Republic" },
                    { code: "DZ", name: "Algeria" },
                    { code: "EC", name: "Ecuador" },
                    { code: "EE", name: "Estonia" },
                    { code: "EG", name: "Egypt" },
                    { code: "EH", name: "Western Sahara" },
                    { code: "ER", name: "Eritrea" },
                    { code: "ES", name: "Spain" },
                    { code: "ET", name: "Ethiopia" },
                    { code: "FI", name: "Finland" },
                    { code: "FJ", name: "Fiji" },
                    { code: "FK", name: "Falkland Islands" },
                    { code: "FM", name: "Micronesia" },
                    { code: "FO", name: "Faroe Islands" },
                    { code: "FR", name: "France" },
                    { code: "GA", name: "Gabon" },
                    { code: "GB", name: "United Kingdom" },
                    { code: "GD", name: "Grenada" },
                    { code: "GE", name: "Georgia" },
                    { code: "GF", name: "French Guiana" },
                    { code: "GG", name: "Guernsey" },
                    { code: "GH", name: "Ghana" },
                    { code: "GI", name: "Gibraltar" },
                    { code: "GL", name: "Greenland" },
                    { code: "GM", name: "Gambia" },
                    { code: "GN", name: "Guinea" },
                    { code: "GP", name: "Guadeloupe" },
                    { code: "GQ", name: "Equatorial Guinea" },
                    { code: "GR", name: "Greece" },
                    { code: "GS", name: "South Georgia" },
                    { code: "GT", name: "Guatemala" },
                    { code: "GU", name: "Guam" },
                    { code: "GW", name: "Guinea-Bissau" },
                    { code: "GY", name: "Guyana" },
                    { code: "HK", name: "Hong Kong" },
                    { code: "HM", name: "Heard Island" },
                    { code: "HN", name: "Honduras" },
                    { code: "HR", name: "Croatia" },
                    { code: "HT", name: "Haiti" },
                    { code: "HU", name: "Hungary" },
                    { code: "ID", name: "Indonesia" },
                    { code: "IE", name: "Ireland" },
                    { code: "IL", name: "Israel" },
                    { code: "IM", name: "Isle of Man" },
                    { code: "IN", name: "India" },
                    { code: "IO", name: "British Indian Ocean Territory" },
                    { code: "IQ", name: "Iraq" },
                    { code: "IS", name: "Iceland" },
                    { code: "IT", name: "Italy" },
                    { code: "JE", name: "Jersey" },
                    { code: "JM", name: "Jamaica" },
                    { code: "JO", name: "Jordan" },
                    { code: "JP", name: "Japan" },
                    { code: "KE", name: "Kenya" },
                    { code: "KG", name: "Kyrgyzstan" },
                    { code: "KH", name: "Cambodia" },
                    { code: "KI", name: "Kiribati" },
                    { code: "KM", name: "Comoros" },
                    { code: "KN", name: "Saint Kitts and Nevis" },
                    { code: "KR", name: "South Korea" },
                    { code: "KW", name: "Kuwait" },
                    { code: "KY", name: "Cayman Islands" },
                    { code: "KZ", name: "Kazakhstan" },
                    { code: "LA", name: "Laos" },
                    { code: "LB", name: "Lebanon" },
                    { code: "LC", name: "Saint Lucia" },
                    { code: "LI", name: "Liechtenstein" },
                    { code: "LK", name: "Sri Lanka" },
                    { code: "LR", name: "Liberia" },
                    { code: "LS", name: "Lesotho" },
                    { code: "LT", name: "Lithuania" },
                    { code: "LU", name: "Luxembourg" },
                    { code: "LV", name: "Latvia" },
                    { code: "LY", name: "Libya" },
                    { code: "MA", name: "Morocco" },
                    { code: "MC", name: "Monaco" },
                    { code: "MD", name: "Moldova" },
                    { code: "ME", name: "Montenegro" },
                    { code: "MF", name: "Saint Martin" },
                    { code: "MG", name: "Madagascar" },
                    { code: "MH", name: "Marshall Islands" },
                    { code: "MK", name: "North Macedonia" },
                    { code: "ML", name: "Mali" },
                    { code: "MM", name: "Myanmar" },
                    { code: "MN", name: "Mongolia" },
                    { code: "MO", name: "Macao" },
                    { code: "MP", name: "Northern Mariana Islands" },
                    { code: "MQ", name: "Martinique" },
                    { code: "MR", name: "Mauritania" },
                    { code: "MS", name: "Montserrat" },
                    { code: "MT", name: "Malta" },
                    { code: "MU", name: "Mauritius" },
                    { code: "MV", name: "Maldives" },
                    { code: "MW", name: "Malawi" },
                    { code: "MX", name: "Mexico" },
                    { code: "MY", name: "Malaysia" },
                    { code: "MZ", name: "Mozambique" },
                    { code: "NA", name: "Namibia" },
                    { code: "NC", name: "New Caledonia" },
                    { code: "NE", name: "Niger" },
                    { code: "NF", name: "Norfolk Island" },
                    { code: "NG", name: "Nigeria" },
                    { code: "NI", name: "Nicaragua" },
                    { code: "NL", name: "Netherlands" },
                    { code: "NO", name: "Norway" },
                    { code: "NP", name: "Nepal" },
                    { code: "NR", name: "Nauru" },
                    { code: "NU", name: "Niue" },
                    { code: "NZ", name: "New Zealand" },
                    { code: "OM", name: "Oman" },
                    { code: "PA", name: "Panama" },
                    { code: "PE", name: "Peru" },
                    { code: "PF", name: "French Polynesia" },
                    { code: "PG", name: "Papua New Guinea" },
                    { code: "PH", name: "Philippines" },
                    { code: "PK", name: "Pakistan" },
                    { code: "PL", name: "Poland" },
                    { code: "PM", name: "Saint Pierre and Miquelon" },
                    { code: "PN", name: "Pitcairn Islands" },
                    { code: "PR", name: "Puerto Rico" },
                    { code: "PS", name: "Palestine" },
                    { code: "PT", name: "Portugal" },
                    { code: "PW", name: "Palau" },
                    { code: "PY", name: "Paraguay" },
                    { code: "QA", name: "Qatar" },
                    { code: "RE", name: "Réunion" },
                    { code: "RO", name: "Romania" },
                    { code: "RS", name: "Serbia" },
                    { code: "RU", name: "Russia" },
                    { code: "RW", name: "Rwanda" },
                    { code: "SA", name: "Saudi Arabia" },
                    { code: "SB", name: "Solomon Islands" },
                    { code: "SC", name: "Seychelles" },
                    { code: "SE", name: "Sweden" },
                    { code: "SG", name: "Singapore" },
                    { code: "SH", name: "Saint Helena" },
                    { code: "SI", name: "Slovenia" },
                    { code: "SJ", name: "Svalbard and Jan Mayen" },
                    { code: "SK", name: "Slovakia" },
                    { code: "SL", name: "Sierra Leone" },
                    { code: "SM", name: "San Marino" },
                    { code: "SN", name: "Senegal" },
                    { code: "SO", name: "Somalia" },
                    { code: "SR", name: "Suriname" },
                    { code: "SS", name: "South Sudan" },
                    { code: "ST", name: "São Tomé and Príncipe" },
                    { code: "SV", name: "El Salvador" },
                    { code: "SX", name: "Sint Maarten" },
                    { code: "SZ", name: "Eswatini" },
                    { code: "TC", name: "Turks and Caicos Islands" },
                    { code: "TD", name: "Chad" },
                    { code: "TF", name: "French Southern Territories" },
                    { code: "TG", name: "Togo" },
                    { code: "TH", name: "Thailand" },
                    { code: "TJ", name: "Tajikistan" },
                    { code: "TK", name: "Tokelau" },
                    { code: "TL", name: "Timor-Leste" },
                    { code: "TM", name: "Turkmenistan" },
                    { code: "TN", name: "Tunisia" },
                    { code: "TO", name: "Tonga" },
                    { code: "TR", name: "Turkey" },
                    { code: "TT", name: "Trinidad and Tobago" },
                    { code: "TV", name: "Tuvalu" },
                    { code: "TW", name: "Taiwan" },
                    { code: "TZ", name: "Tanzania" },
                    { code: "UA", name: "Ukraine" },
                    { code: "UG", name: "Uganda" },
                    { code: "UM", name: "U.S. Minor Outlying Islands" },
                    { code: "US", name: "United States" },
                    { code: "UY", name: "Uruguay" },
                    { code: "UZ", name: "Uzbekistan" },
                    { code: "VA", name: "Vatican City" },
                    { code: "VC", name: "Saint Vincent and the Grenadines" },
                    { code: "VE", name: "Venezuela" },
                    { code: "VG", name: "British Virgin Islands" },
                    { code: "VI", name: "U.S. Virgin Islands" },
                    { code: "VN", name: "Vietnam" },
                    { code: "VU", name: "Vanuatu" },
                    { code: "WF", name: "Wallis and Futuna" },
                    { code: "WS", name: "Samoa" },
                    { code: "XK", name: "Kosovo" },
                    { code: "YE", name: "Yemen" },
                    { code: "YT", name: "Mayotte" },
                    { code: "ZA", name: "South Africa" },
                    { code: "ZM", name: "Zambia" },
                    { code: "ZW", name: "Zimbabwe" }
                  ].map(country => (
                    <label key={country.code} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={country.code}
                        checked={field.value.includes(country.code)}
                        onChange={(e) => {
                          const newValue = e.target.checked 
                            ? [...field.value, country.code]
                            : field.value.filter(c => c !== country.code);
                          field.onChange(newValue);
                        }}
                        className="h-4 w-4"
                      />
                      <span>{country.name}</span>
                    </label>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="mt-2 col-span-2"
                    onClick={() => field.onChange([])}
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
