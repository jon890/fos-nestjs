import { Store } from '../domain/store.entity';
import { storeTable } from './store.schema';

export class StoreMapper {
  static toDomain(store: typeof storeTable): Store {
    return new Store(
      store.$inferSelect.id,
      store.$inferSelect.name,
      store.$inferSelect.isOpen,
    );
  }

  static toRow(store: Store) {
    return {
      id: store.id,
      name: store.name,
      isOpen: store.isOpen,
    };
  }
}
