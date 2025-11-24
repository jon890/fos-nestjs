import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(RequestLoggingMiddleware.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = crypto.randomUUID();

    // 요청 시작 로깅
    this.logger.log(
      `[Request-${requestId}] Method: ${req.method}, URL: ${this.parseUrl(req)}, body: ${JSON.stringify(req.body)}`,
    );

    // 응답 완료 후 로깅 (next() 실행 후 응답이 완료되면 실행됨)
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this.logger.error(
          `[Response-${requestId}] Status Code: ${res.statusCode}, URL: ${this.parseUrl(req)}`,
        );
      } else {
        this.logger.log(
          `[Response-${requestId}] Status Code: ${res.statusCode}, URL: ${this.parseUrl(req)}`,
        );
      }
    });

    next();
  }

  private parseUrl(req: Request): string {
    return req.baseUrl ?? '/';
  }
}
