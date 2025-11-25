import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { OpenTelemetryLogger } from 'src/telemetry/otel.logger';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: OpenTelemetryLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = crypto.randomUUID();
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const baseLog = {
        requestId,
        method: req.method,
        url: this.parseUrl(req),
        statusCode: res.statusCode,
        durationMs: duration,
      };

      if (res.statusCode >= 400) {
        this.logger.error(
          `[HTTP] ${req.method} ${this.parseUrl(req)} -> ${res.statusCode} (${duration}ms)`,
          undefined,
          RequestLoggingMiddleware.name,
        );
      } else {
        this.logger.log(
          `[HTTP] ${req.method} ${this.parseUrl(req)} -> ${res.statusCode} (${duration}ms)`,
          RequestLoggingMiddleware.name,
        );
      }

      // 구조화 로그로 세부 필드 전달
      this.logger.log(JSON.stringify(baseLog), RequestLoggingMiddleware.name);
    });

    next();
  }

  private parseUrl(req: Request): string {
    return req.baseUrl ?? '/';
  }
}
