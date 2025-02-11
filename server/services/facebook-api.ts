import type { Ad } from "@shared/types";
import {
  type FacebookApiConfig,
  type FacebookApiResponse,
  type SearchParams,
  FACEBOOK_AD_FIELDS,
  type FacebookAdField
} from './facebook-api.types';
import { IFacebookApiService, IHttpClient, ICacheService } from './interfaces';
import { ILogger } from './logger.service';

/**
 * Service for interacting with the Facebook Ad Library API
 */
export class FacebookApiService implements IFacebookApiService {
  private readonly config: Required<FacebookApiConfig>;
  private readonly cacheKeyPrefix = 'fb_ads:';
  private readonly cacheTTL = 3600; // 1 hour

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly logger: ILogger,
    private readonly cache?: ICacheService,
    config: FacebookApiConfig
  ) {
    this.config = {
      accessToken: config.accessToken,
      apiVersion: config.apiVersion,
      requestTimeout: config.requestTimeout ?? 30000,
      minRequestInterval: config.minRequestInterval ?? 1000,
      maxRetries: config.maxRetries ?? 3,
      defaultPageSize: config.defaultPageSize ?? 24
    };

    if (!this.config.accessToken) {
      throw new Error("Facebook API access token not configured");
    }

    this.logger.info('FacebookApiService initialized', {
      apiVersion: this.config.apiVersion,
      defaultPageSize: this.config.defaultPageSize
    });
  }

  /**
   * Tests the connection to the Facebook Ad Library API
   */
  async testConnection(): Promise<{
    status: string;
    api_version: string;
    response_data: {
      data_count: number;
      has_paging: boolean;
      timestamp: string;
    };
  }> {
    try {
      this.logger.info('Testing Facebook API connection');

      const testParams: SearchParams = {
        search_terms: "test",
        ad_type: "ALL",
        country: ["US"],
        ad_active_status: "ACTIVE",
        media_type: "ALL",
        search_type: "KEYWORD_UNORDERED",
      };

      const url = this.buildSearchUrl(testParams, FACEBOOK_AD_FIELDS.BASIC);
      const responseData = await this.httpClient.get<FacebookApiResponse>(url);

      const result = {
        status: "connected",
        api_version: this.config.apiVersion,
        response_data: {
          data_count: responseData.data?.length || 0,
          has_paging: !!responseData.paging,
          timestamp: new Date().toISOString()
        }
      };

      this.logger.info('API connection test successful', result);
      return result;
    } catch (error) {
      this.logger.error('API connection test failed', error);
      throw error;
    }
  }

  /**
   * Searches for ads using the provided parameters
   */
  async searchAds(params: SearchParams, maxResults: number = this.config.defaultPageSize): Promise<FacebookApiResponse> {
    try {
      this.logger.info('Searching for ads', { params, maxResults });

      // Try to get from cache first
      const cacheKey = this.buildCacheKey(params, maxResults);
      if (this.cache) {
        const cached = await this.cache.get<FacebookApiResponse>(cacheKey);
        if (cached) {
          this.logger.debug('Returning cached results', { cacheKey });
          return cached;
        }
      }

      const ads = await this.fetchAllAds(params, maxResults);
      const response: FacebookApiResponse = {
        data: ads,
        paging: ads.length >= maxResults ? {
          cursors: {
            before: '',
            after: 'has_more'
          }
        } : undefined
      };

      // Cache the results
      if (this.cache) {
        await this.cache.set(cacheKey, response, this.cacheTTL);
      }

      this.logger.info('Ad search completed', {
        resultsCount: ads.length,
        hasMore: ads.length >= maxResults
      });

      return response;
    } catch (error) {
      this.logger.error('Ad search failed', error, { params });
      throw error;
    }
  }

  /**
   * Fetches ads with pagination support
   */
  private async fetchAllAds(params: SearchParams, maxResults: number): Promise<Ad[]> {
    let allAds: Ad[] = [];
    let after: string | undefined;
    let pageCount = 0;

    while (allAds.length < maxResults) {
      pageCount++;
      this.logger.debug('Fetching ads page', { pageCount, currentCount: allAds.length });

      const url = this.buildSearchUrl(params, FACEBOOK_AD_FIELDS.FULL, after);
      const data = await this.httpClient.get<FacebookApiResponse>(url);
      
      allAds = [...allAds, ...data.data];
      
      if (!data.paging?.cursors?.after || allAds.length >= maxResults) {
        break;
      }
      
      after = data.paging.cursors.after;
    }

    this.logger.debug('Finished fetching ads', {
      totalPages: pageCount,
      totalAds: allAds.length
    });
    
    return allAds.slice(0, maxResults);
  }

  /**
   * Builds the URL for the Facebook Ad Library API
   */
  private buildSearchUrl(params: SearchParams, fields: readonly FacebookAdField[], after?: string): string {
    const queryParams = {
      access_token: this.config.accessToken,
      search_terms: params.search_terms,
      search_type: params.search_type,
      ad_type: params.ad_type,
      ad_reached_countries: params.country,
      limit: String(this.config.defaultPageSize),
      fields: fields.join(","),
      ad_active_status: params.ad_active_status,
      media_type: params.media_type,
      ad_delivery_date_min: params.ad_delivery_date_min,
      ad_delivery_date_max: params.ad_delivery_date_max,
      after
    };

    return `https://graph.facebook.com/${this.config.apiVersion}/ads_archive?${new URLSearchParams(
      Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, Array.isArray(value) ? JSON.stringify(value) : value])
    )}`;
  }

  /**
   * Builds a cache key for the given search parameters
   */
  private buildCacheKey(params: SearchParams, maxResults: number): string {
    const key = `${this.cacheKeyPrefix}${JSON.stringify({
      ...params,
      maxResults
    })}`;
    return Buffer.from(key).toString('base64');
  }
}
