import { IHttpClient } from './interfaces';
import { ILogger } from './logger.service';
import { FacebookApiError } from './facebook-api.types';
import { ApiLogger } from './api-logger';

export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP client implementation with retries and logging
 */
export class HttpClient implements IHttpClient {
  private readonly logger: ILogger;
  private readonly apiLogger: ApiLogger;
  private readonly config: Required<HttpClientConfig>;

  constructor(logger: ILogger, config: HttpClientConfig = {}) {
    this.logger = logger;
    this.apiLogger = new ApiLogger();
    this.config = {
      baseUrl: config.baseUrl ?? '',
      timeout: config.timeout ?? 30000,
      retries: config.retries ?? 3,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...config.headers
      }
    };
  }

  /**
   * Extract query parameters from URL
   */
  private extractQueryParams(url: string): Record<string, any> {
    try {
      const urlObj = new URL(url);
      const params: Record<string, any> = {};
      urlObj.searchParams.forEach((value, key) => {
        try {
          // Try to parse JSON values
          params[key] = JSON.parse(value);
        } catch {
          // If not JSON, use the raw value
          params[key] = value;
        }
      });
      return params;
    } catch (error) {
      return {};
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET'
    });
  }

  /**
   * Make a POST request
   */
  async post<T>(url: string, data: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * Make an HTTP request with retries
   */
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const fullUrl = this.buildUrl(url);
    let lastError: Error | null = null;

    // Log the request with complete data
    const queryParams = this.extractQueryParams(fullUrl);
    this.apiLogger.logRequest(fullUrl, {
      method: options.method,
      headers: options.headers,
      body: options.body,
      queryParams: queryParams,
      url: {
        full: fullUrl,
        pathname: new URL(fullUrl).pathname,
        search: new URL(fullUrl).search
      }
    });
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        this.logger.debug(`Making request to ${fullUrl}`, { attempt });
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(fullUrl, {
          ...options,
          headers: {
            ...this.config.headers,
            ...options.headers
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        const responseData = await response.json();
        
        // Log the response
        this.apiLogger.logResponse(fullUrl, responseData);
        
        if (!response.ok) {
          const error = responseData as FacebookApiError;
          throw new Error(error.error?.message || `HTTP ${response.status}`);
        }
        
        this.logger.debug('Request successful', { url: fullUrl });
        return responseData;
      } catch (error) {
        lastError = error;
        
        // Log the error
        this.apiLogger.logError(fullUrl, error);
        
        if (error.name === 'AbortError') {
          this.logger.warn(`Request timeout (attempt ${attempt}/${this.config.retries})`, { url: fullUrl });
        } else {
          this.logger.error(`Request failed (attempt ${attempt}/${this.config.retries})`, error, { url: fullUrl });
        }
        
        if (attempt === this.config.retries) {
          throw error;
        }
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError || new Error('Request failed');
  }

  /**
   * Build full URL from base URL and path
   */
  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.config.baseUrl}${path}`;
  }
}
