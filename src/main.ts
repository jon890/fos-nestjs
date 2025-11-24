import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import type { Express } from 'express';

async function bootstrap(): Promise<Express> {
  const app = await NestFactory.create<NestApplication>(AppModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

// vite-plugin-node가 요구하는 export
export const viteNodeApp = bootstrap();
