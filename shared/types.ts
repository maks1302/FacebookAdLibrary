export type AdActiveStatus = 'ACTIVE' | 'ALL' | 'INACTIVE';
export type MediaType = 'ALL' | 'IMAGE' | 'MEME' | 'VIDEO' | 'NONE';

export interface Ad {
  id: string;
  page_name: string;
  ad_creative_bodies: string[];
  ad_creative_link_captions?: string[];
  ad_creative_link_descriptions?: string[];
  ad_creative_link_titles?: string[];
  ad_creation_time: string;
  ad_delivery_start_time: string;
  ad_delivery_stop_time?: string;
  ad_snapshot_url?: string;
  bylines?: string[] | string;
  currency?: string;
  languages?: string[];
  publisher_platforms?: string[];
  target_ages?: string[];
  target_gender?: "Women" | "Men" | "All";
  target_locations?: {
    name: string;
    type: string;
    excluded: boolean;
    num_obfuscated: number;
  }[];
  delivery_by_region?: {
    region: string;
    percentage: number;
  }[];
  demographic_distribution?: {
    age: string;
    gender: string;
    percentage: number;
  }[];
  impressions?: {
    lower_bound: number;
    upper_bound: number;
  };
  spend?: {
    lower_bound: number;
    upper_bound: number;
  };
}