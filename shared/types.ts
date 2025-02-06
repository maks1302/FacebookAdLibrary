export interface Ad {
  id: string;
  page_name: string;
  ad_creative_bodies: string[];
  bylines?: string[];
  ad_delivery_start_time: string;
  ad_delivery_stop_time?: string;
  currency?: string;
  impressions?: {
    lower_bound: number;
    upper_bound: number;
  };
  spend?: {
    lower_bound: number;
    upper_bound: number;
  };
}