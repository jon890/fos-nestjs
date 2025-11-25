import { NotFoundException } from '@nestjs/common';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getStore(storeId: string): Promise<Store> {
    const store = await this.storeRepository.findById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async openStore(storeId: string): Promise<void> {
    const store = await this.getStore(storeId);
    const openStore = store.open();
    await this.storeRepository.save(openStore);
  }

  async closeStore(storeId: string): Promise<void> {
    const store = await this.getStore(storeId);
    const closedStore = store.close();
    await this.storeRepository.save(closedStore);
  }
}
