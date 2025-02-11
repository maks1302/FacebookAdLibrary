import { FacebookApiError, FacebookApiErrorCode } from './facebook-api.types';

/**
 * Utility class for handling Facebook API requests
 */
export class FacebookApiUtils {
  private lastRequestTime: number = 0;
  private retryCount: number = 0;

  constructor(
    private readonly requestTimeout: number = 30000,
    private readonly minRequestInterval: number = 1000,
    private readonly maxRetries: number = 3
  ) {}

  /**
   * Handles API errors and provides meaningful error messages
   */
  private handleApiError(error: FacebookApiError): never {
    const errorCode = error.error?.code;
    let message: string;

    switch (errorCode) {
      case FacebookApiErrorCode.RateLimit:
      case FacebookApiErrorCode.RateLimitExtended:
        message = "Rate limit exceeded. Please try again later.";
        break;
      case FacebookApiErrorCode.InvalidToken:
        message = "Invalid or expired access token. Please check your configuration.";
        break;
      case FacebookApiErrorCode.InvalidParameter:
        message = "Invalid parameter in request. Please check your inputs.";
        break;
      default:
        message = error.error?.message || "An unknown error occurred";
    }

    const enhancedError = new Error(message);
    enhancedError.name = 'FacebookApiError';
    (enhancedError as any).code = errorCode;
    (enhancedError as any).original = error;
    
    throw enhancedError;
  }

  /**
   * Enforces rate limiting between requests
   */
  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
  }

  /**
   * Makes a rate-limited fetch request with timeout and retries
   */
  async rateLimitedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    await this.enforceRateLimit();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Facebook-Ad-Library-Browser/1.0',
          ...options.headers,
        },
      });

      // Reset retry count on successful request
      this.retryCount = 0;
      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.warn(`Request timed out, retrying (${this.retryCount}/${this.maxRetries})...`);
          return this.rateLimitedFetch(url, options);
        }
        throw new Error(`Request timed out after ${this.maxRetries} retries.`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Processes API response and handles errors
   */
  async processApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json() as FacebookApiError;
      return this.handleApiError(error);
    }
    return response.json();
  }

  /**
   * Builds URL with query parameters
   */
  buildUrl(baseUrl: string, params: Record<string, string | string[] | undefined>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, value);
        }
      }
    });

    return `${baseUrl}?${searchParams}`;
  }
}
