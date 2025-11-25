import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Store } from '../domain/store.entity';
import { StoreRepository } from '../domain/store.repository';
import { StoreMapper } from './store.mapper';
import { storeTable } from './store.schema';

@Injectable()
export class DrizzleStoreRepository implements StoreRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findById(storeId: string): Promise<Store | null> {
    const store = await this.drizzleService.db
      .select()
      .from(storeTable)
      .where(eq(storeTable.id, BigInt(storeId)));

    return store ? StoreMapper.toDomain(store[0] as any) : null;
  }

  async save(store: Store): Promise<void> {
    const row = StoreMapper.toRow(store);
    await this.drizzleService.db.insert(storeTable).values(row);
  }
}
