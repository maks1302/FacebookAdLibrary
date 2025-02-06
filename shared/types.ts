export interface Ad {
  id: string;
  page_name: string;
  ad_creative_body: string;
  ad_creative_link_caption?: string;
  ad_creative_link_title?: string;
  ad_delivery_start_time: string;
  ad_delivery_stop_time?: string;
  currency?: string;
  funding_entity: string;
  impressions?: {
    lower_bound: number;
    upper_bound: number;
  };
  spend?: {
    lower_bound: number;
    upper_bound: number;
  };
}
