import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ApiLogger {
  private readonly logDir: string;
  private readonly requestLogFile: string;
  private readonly responseLogFile: string;

  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.requestLogFile = path.join(this.logDir, 'facebook-api-requests.log');
    this.responseLogFile = path.join(this.logDir, 'facebook-api-responses.log');
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatLogEntry(data: any): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}]\n${JSON.stringify(data, null, 2)}\n${'='.repeat(80)}\n\n`;
  }

  public logRequest(url: string, params: any) {
    const logEntry = {
      type: 'REQUEST',
      timestamp: new Date().toISOString(),
      url,
      params
    };

    fs.appendFileSync(
      this.requestLogFile,
      this.formatLogEntry(logEntry)
    );
  }

  public logResponse(url: string, response: any) {
    const logEntry = {
      type: 'RESPONSE',
      timestamp: new Date().toISOString(),
      url,
      response
    };

    fs.appendFileSync(
      this.responseLogFile,
      this.formatLogEntry(logEntry)
    );
  }

  public logError(url: string, error: any) {
    const logEntry = {
      type: 'ERROR',
      timestamp: new Date().toISOString(),
      url,
      error: {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      }
    };

    fs.appendFileSync(
      this.responseLogFile,
      this.formatLogEntry(logEntry)
    );
  }
}