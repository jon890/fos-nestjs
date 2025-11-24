import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const port = process.env.SERVER_PORT ?? 3000;

  await app.listen(port).then(() => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap();
