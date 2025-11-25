import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';

export class OpenTelemetryLogger implements LoggerService {
  private readonly consoleLogger = new ConsoleLogger();
  private readonly otelLogger = logs.getLogger('fos-nestjs', undefined, {
    includeTraceContext: true,
  });

  log(message: any, context?: string) {
    this.consoleLogger.log(message, context);
    this.emit(SeverityNumber.INFO, message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.consoleLogger.error(message, trace, context);
    this.emit(SeverityNumber.ERROR, message, context, trace);
  }

  warn(message: any, context?: string) {
    this.consoleLogger.warn(message, context);
    this.emit(SeverityNumber.WARN, message, context);
  }

  debug(message: any, context?: string) {
    this.consoleLogger.debug(message, context);
    this.emit(SeverityNumber.DEBUG, message, context);
  }

  verbose(message: any, context?: string) {
    this.consoleLogger.verbose(message, context);
    this.emit(SeverityNumber.TRACE, message, context);
  }

  private emit(
    severity: SeverityNumber,
    message: any,
    context?: string,
    stack?: string,
  ) {
    const spanContext = trace.getActiveSpan()?.spanContext();

    this.otelLogger.emit({
      severityNumber: severity,
      severityText: SeverityNumber[severity],
      body: typeof message === 'string' ? message : JSON.stringify(message),
      attributes: {
        context,
        stack,
        trace_id: spanContext?.traceId,
        span_id: spanContext?.spanId,
      },
    });
  }
}
