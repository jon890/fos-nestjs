import { Order, OrderItem } from '../domain/order.entity';

export class OrderMapper {
  static toRow(order: Order) {
    return {
      id: order.id,
      store_id: order.storeId,
      status: order.status,
      total_price: order.totalPrice,
      items: order.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
      ordered_at: order.orderedAt,
    };
  }

  static toDomain(row: any): Order {
    const items = (row.items ?? []).map(
      (i: any) => new OrderItem(i.productId, i.quantity, Number(i.price)),
    );
    return new Order(
      row.id,
      row.store_id,
      items,
      Number(row.total_price),
      row.status,
      new Date(row.ordered_at),
    );
  }
}
