import type { Ad } from "@shared/types";
import type { FacebookApiResponse, SearchParams } from './facebook-api.types';

/**
 * Interface for HTTP client implementations
 */
export interface IHttpClient {
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, data: any, options?: RequestInit): Promise<T>;
}

/**
 * Interface for Facebook API service
 */
export interface IFacebookApiService {
  testConnection(): Promise<{
    status: string;
    api_version: string;
    response_data: {
      data_count: number;
      has_paging: boolean;
      timestamp: string;
    };
  }>;
  
  searchAds(params: SearchParams, maxResults?: number): Promise<FacebookApiResponse>;
}

/**
 * Interface for cache service
 */
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Interface for rate limiter
 */
export interface IRateLimiter {
  checkLimit(key: string): Promise<boolean>;
  incrementCounter(key: string): Promise<void>;
}
