import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { Express } from 'express';
import { AppModule } from './app.module';
import { setupOpenTelemetry } from './telemetry/otel.setup';
import { OpenTelemetryLogger } from './telemetry/otel.logger';

async function bootstrap(): Promise<Express> {
  // OpenTelemetry는 애플리케이션 시작 전에 초기화되어야 함
  setupOpenTelemetry();

  const app = await NestFactory.create<NestApplication>(AppModule);
  const otelLogger = app.get(OpenTelemetryLogger);

  app.useLogger(otelLogger);
  Logger.overrideLogger(otelLogger);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

// vite-plugin-node가 요구하는 export
export const viteNodeApp = bootstrap();
