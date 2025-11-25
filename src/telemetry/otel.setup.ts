import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { logs } from '@opentelemetry/api-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export function setupOpenTelemetry() {
  // Enable debug logs when OTEL_DEBUG=true (helps spot exporter errors)
  if (process.env.OTEL_DEBUG === 'true') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  }

  const baseEndpoint =
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://otel-collector:4318';

  // Allow overriding per signal while defaulting to base endpoint
  const tracesEndpoint =
    process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ??
    `${baseEndpoint}/v1/traces`;

  const logsEndpoint =
    process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT ?? `${baseEndpoint}/v1/logs`;

  const prometheusPort = Number(process.env.OTEL_PROM_PORT ?? 9464);

  // traces -> OTLP HTTP -> Collector
  const traceExporter: OTLPTraceExporter = new OTLPTraceExporter({
    url: tracesEndpoint,
  });

  // logs -> OTLP HTTP -> Collector
  const logExporter: OTLPLogExporter = new OTLPLogExporter({
    url: logsEndpoint,
  });

  // metrics -> Prometheus exporter (this exporter opens its own HTTP server on given port)
  const prometheusExporter: PrometheusExporter = new PrometheusExporter({
    port: prometheusPort,
    appendTimestamp: false,
  });

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'fos-nestjs',
  });

  const sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReader: prometheusExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  const loggerProvider = new LoggerProvider({
    resource,
    processors: [
      new BatchLogRecordProcessor(logExporter, {
        // tweak if needed; defaults are fine for backend apps
        maxExportBatchSize: 512,
      }),
    ],
  });

  logs.setGlobalLoggerProvider(loggerProvider);

  sdk.start();

  // graceful shutdown helper
  async function shutdown() {
    try {
      await sdk.shutdown();
      await loggerProvider.shutdown();
    } catch (e) {
      console.error('Error while shutting down OpenTelemetry SDK', e);
    }
  }

  // process.on 핸들러는 void를 반환해야 하므로 void로 래핑
  process.on('SIGINT', () => {
    void shutdown();
  });

  process.on('SIGTERM', () => {
    void shutdown();
  });

  return {
    sdk,
    prometheusPort,
    shutdown,
  };
}
