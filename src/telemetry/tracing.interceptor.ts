import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  intercept(contextArg: ExecutionContext, next: CallHandler): Observable<any> {
    const req = contextArg.switchToHttp().getRequest<Request>();
    const tracer = trace.getTracer('nestjs-interceptor');
    const route = req.route?.path || req.url || 'unknown';

    return tracer.startActiveSpan(`http ${req.method} ${route}`, (span) => {
      span.setAttribute('http.method', req.method);
      span.setAttribute('http.route', route);
      span.setAttribute('http.url', req.url);
      return next.handle().pipe(
        tap({
          next: () => {
            span.setStatus({ code: SpanStatusCode.UNSET });
            span.end();
          },
          error: (err) => {
            span.recordException(err);
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: String((err as Error)?.message ?? err),
            });
            span.end();
          },
        }),
      );
    });
  }
}
