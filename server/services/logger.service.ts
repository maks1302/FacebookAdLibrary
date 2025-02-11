/**
 * Log levels for the application
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Interface for logger implementation
 */
export interface ILogger {
  debug(message: string, ...meta: any[]): void;
  info(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  error(message: string, error?: Error, ...meta: any[]): void;
}

/**
 * Default logger implementation
 */
export class Logger implements ILogger {
  private readonly context: string;
  
  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
  }

  private sanitizeData(data: any): any {
    if (!data) return data;
    
    const sensitiveFields = ['access_token', 'password', 'api_key'];
    
    if (typeof data === 'object') {
      const sanitized = { ...data };
      for (const field of sensitiveFields) {
        if (field in sanitized) {
          sanitized[field] = '***REDACTED***';
        }
      }
      return sanitized;
    }
    
    return data;
  }

  debug(message: string, ...meta: any[]): void {
    const sanitizedMeta = meta.map(m => this.sanitizeData(m));
    console.debug(
      this.formatMessage(LogLevel.DEBUG, message),
      ...sanitizedMeta
    );
  }

  info(message: string, ...meta: any[]): void {
    const sanitizedMeta = meta.map(m => this.sanitizeData(m));
    console.info(
      this.formatMessage(LogLevel.INFO, message),
      ...sanitizedMeta
    );
  }

  warn(message: string, ...meta: any[]): void {
    const sanitizedMeta = meta.map(m => this.sanitizeData(m));
    console.warn(
      this.formatMessage(LogLevel.WARN, message),
      ...sanitizedMeta
    );
  }

  error(message: string, error?: Error, ...meta: any[]): void {
    const sanitizedMeta = meta.map(m => this.sanitizeData(m));
    console.error(
      this.formatMessage(LogLevel.ERROR, message),
      error?.stack || error,
      ...sanitizedMeta
    );
  }
}
