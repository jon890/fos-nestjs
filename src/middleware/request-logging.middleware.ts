import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(RequestLoggingMiddleware.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = crypto.randomUUID();

    this.logger.log(
      `[Request-${requestId}] Method : ${req.method}, URL: ${this.parseUrl(req)}, body: ${JSON.stringify(req.body)}`,
    );
    next();

    this.logger.log(
      `[Response-${requestId}] Status Code: ${res.statusCode}, URL: ${this.parseUrl(req)}`,
    );
  }

  private parseUrl(req: Request): string {
    return req.baseUrl ?? '/';
  }
}
