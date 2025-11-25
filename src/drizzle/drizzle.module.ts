import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}
