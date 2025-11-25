import { bigint, mysqlTable, varchar, boolean } from 'drizzle-orm/mysql-core';

export const storeTable = mysqlTable('store', {
  id: bigint({ mode: 'bigint' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  isOpen: boolean('is_open').notNull().default(true),
});
