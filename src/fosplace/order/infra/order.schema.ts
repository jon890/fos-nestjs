import {
  decimal,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const orderTable = mysqlTable('orders', {
  id: varchar('id').primaryKey(), // UUID string
  store_id: varchar('store_id').notNull(),
  status: varchar('status', { length: 32 }).notNull(),
  total_price: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
  items:
    json('items').$type<
      { productId: string; quantity: number; price: number }[]
    >(),
  ordered_at: timestamp('ordered_at').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
