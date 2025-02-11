import { z } from "zod";
import type { Ad } from "@shared/types";

/**
 * Facebook API error codes and their meanings
 */
export enum FacebookApiErrorCode {
  RateLimit = 4,
  RateLimitExtended = 17,
  InvalidToken = 190,
  InvalidParameter = 100,
}

/**
 * Facebook API error response structure
 */
export interface FacebookApiError {
  error: {
    message: string;
    type: string;
    code: FacebookApiErrorCode;
    fbtrace_id: string;
  };
}

/**
 * Facebook API pagination cursor structure
 */
export interface FacebookApiCursor {
  before: string;
  after: string;
}

/**
 * Facebook API response structure
 */
export interface FacebookApiResponse {
  data: Ad[];
  paging?: {
    cursors: FacebookApiCursor;
  };
}

/**
 * Configuration options for the Facebook API service
 */
export interface FacebookApiConfig {
  accessToken: string;
  apiVersion: string;
  requestTimeout?: number;
  minRequestInterval?: number;
  maxRetries?: number;
  defaultPageSize?: number;
}

/**
 * Search parameters schema for input validation
 */
export const searchParamsSchema = z.object({
  search_terms: z.string(),
  search_type: z.enum(["KEYWORD_UNORDERED", "KEYWORD_EXACT_PHRASE"]).default("KEYWORD_UNORDERED"),
  ad_type: z.enum(["ALL", "POLITICAL_AND_ISSUE_ADS"]),
  country: z.array(z.string().length(2)),
  ad_active_status: z.enum(["ACTIVE", "ALL", "INACTIVE"]).default("ACTIVE"),
  media_type: z.enum(["ALL", "IMAGE", "MEME", "VIDEO", "NONE"]).default("ALL"),
  ad_delivery_date_min: z.string().optional(),
  ad_delivery_date_max: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

/**
 * Available fields for Facebook Ad Library API
 */
export const FACEBOOK_AD_FIELDS = {
  BASIC: ["id", "page_name", "ad_creative_bodies", "bylines"],
  FULL: [
    "id",
    "page_name",
    "ad_creative_bodies",
    "ad_creative_link_captions",
    "ad_creative_link_descriptions",
    "ad_creative_link_titles",
    "ad_creation_time",
    "ad_delivery_start_time",
    "ad_delivery_stop_time",
    "ad_snapshot_url",
    "currency",
    "impressions",
    "spend",
    "demographic_distribution",
    "delivery_by_region",
    "publisher_platforms",
    "target_ages",
    "target_gender",
    "target_locations",
    "bylines",
    "languages",
    "status",
    "effective_status"
  ]
} as const;

export type FacebookAdField = typeof FACEBOOK_AD_FIELDS[keyof typeof FACEBOOK_AD_FIELDS][number];
