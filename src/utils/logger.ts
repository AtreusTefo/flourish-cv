/**
 * Environment-aware logging utility
 * Logs to console in development, suppresses in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: string | number | boolean | null | undefined;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      error: error instanceof Error ? error.message : String(error || 'Unknown error')
    };

    if (this.isDevelopment) {
      console.error(this.formatMessage('error', message, errorContext));
    }
    
    // In production, you might want to send errors to a logging service
    // Example: sendToLoggingService(message, errorContext);
  }

  // Utility methods for common logging patterns
  apiError(endpoint: string, error: Error | unknown, context?: LogContext): void {
    this.error(`API Error: ${endpoint}`, error, { ...context, endpoint });
  }

  userAction(action: string, userId?: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, { ...context, action, userId });
  }

  componentError(component: string, error: Error | unknown, context?: LogContext): void {
    this.error(`Component Error: ${component}`, error, { ...context, component });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for backward compatibility with console methods
export const log = {
  debug: (message: string, context?: LogContext) => logger.debug(message, context),
  info: (message: string, context?: LogContext) => logger.info(message, context),
  warn: (message: string, context?: LogContext) => logger.warn(message, context),
  error: (message: string, error?: Error | unknown, context?: LogContext) => logger.error(message, error, context),
};