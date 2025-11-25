import { Module } from '@nestjs/common';
import { StoreRepository } from '../domain/store.repository';
import { StoreService } from '../domain/store.service';
import { DrizzleStoreRepository } from '../infra/store.repository.drizzle';

@Module({
  providers: [
    StoreService,
    {
      provide: StoreRepository,
      useClass: DrizzleStoreRepository,
    },
  ],

  exports: [StoreService],
})
export class StoreModule {}
