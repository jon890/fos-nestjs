import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Order } from '../domain/order.entity';
import { OrderRepository } from '../domain/order.repository';
import { OrderMapper } from './order.mapper';
import { orderTable } from './order.schema';

@Injectable()
export class DrizzleOrderRepository implements OrderRepository {
  constructor(private readonly drizzle: DrizzleService) {}

  private get db() {
    return this.drizzle.db;
  }

  async save(order: Order): Promise<void> {
    const row = OrderMapper.toRow(order);
    await this.db.insert(orderTable).values(row).onDuplicateKeyUpdate({
      set: row,
    });
  }

  async findById(id: string): Promise<Order | null> {
    const rows = await this.db
      .select()
      .from(orderTable)
      .where(eq(orderTable.id, id));
    if (!rows || rows.length === 0) return null;
    return OrderMapper.toDomain(rows[0]);
  }
}
