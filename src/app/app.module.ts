import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SampleModule } from 'src/sample/sample.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggingMiddleware } from 'src/middleware/request-logging.middleware';

@Module({
  imports: [SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
