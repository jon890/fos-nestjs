import { Store } from './store.entity';

export abstract class StoreRepository {
  abstract findById(storeId: string): Promise<Store | null>;
  abstract save(store: Store): Promise<void>;
}
