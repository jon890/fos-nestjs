import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(RequestLoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request - Method: ${req.method}, URL: ${req.baseUrl}`);
    next();
  }
}
