import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import databaseConfig from 'src/config/database.config';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { StoreModule } from 'src/fosplace/store/application/store.module';
import { RequestLoggingMiddleware } from 'src/middleware/request-logging.middleware';
import { TracingInterceptor } from './telemetry/tracing.interceptor';
import { OpenTelemetryLogger } from './telemetry/otel.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DrizzleModule,
    StoreModule,
  ],
  providers: [
    OpenTelemetryLogger,
    RequestLoggingMiddleware,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
