import { z } from 'zod';
import { FacebookApiService } from './facebook-api';
import { HttpClient } from './http-client.service';
import { Logger } from './logger.service';
import { ICacheService, IFacebookApiService } from './interfaces';
import type { FacebookApiConfig } from './facebook-api.types';

/**
 * Configuration schema for Facebook API
 */
const configSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  apiVersion: z.string().regex(/^v\d+\.\d+$/, 'API version must be in format vX.Y'),
  requestTimeout: z.number().positive().optional(),
  minRequestInterval: z.number().positive().optional(),
  maxRetries: z.number().positive().optional(),
  defaultPageSize: z.number().positive().max(100).optional(),
});

/**
 * Factory for creating FacebookApiService instances
 */
export class FacebookApiServiceFactory {
  /**
   * Creates a new instance of FacebookApiService with all required dependencies
   */
  static create(
    config: FacebookApiConfig,
    cache?: ICacheService,
    loggerContext: string = 'FacebookAPI'
  ): IFacebookApiService {
    // Validate configuration
    const validatedConfig = configSchema.parse(config);
    
    // Create logger
    const logger = new Logger(loggerContext);
    
    // Create HTTP client
    const httpClient = new HttpClient(logger, {
      timeout: validatedConfig.requestTimeout,
      retries: validatedConfig.maxRetries,
      headers: {
        'User-Agent': 'Facebook-Ad-Library-Browser/1.0'
      }
    });
    
    // Create and return service instance
    return new FacebookApiService(
      httpClient,
      logger,
      cache,
      validatedConfig
    );
  }

  /**
   * Creates a mock instance for testing
   */
  static createMock(): IFacebookApiService {
    return {
      testConnection: jest.fn(),
      searchAds: jest.fn()
    };
  }
}
