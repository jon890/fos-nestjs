import { Module } from '@nestjs/common';
import { SampleModule } from 'src/sample/sample.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
