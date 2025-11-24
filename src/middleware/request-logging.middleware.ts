import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(RequestLoggingMiddleware.name, {
    timestamp: true,
  });

  private readonly tracer = trace.getTracer('fos-nestjs', '1.0.0');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`[Request] Method : ${req.method}, URL: ${req.baseUrl}`);
    next();
  }
}
