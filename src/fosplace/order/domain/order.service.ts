import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order, OrderItem } from './order.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository) {}

  async createOrderFromPayload(params: {
    storeId: string;
    items: { productId: string; quantity: number; price: number }[];
    totalPrice: number;
    orderedAt: string;
  }) {
    // 간단 검증
    const calcTotal = params.items.reduce(
      (s, it) => s + it.price * it.quantity,
      0,
    );
    if (
      Math.round(calcTotal * 100) / 100 !==
      Math.round(params.totalPrice * 100) / 100
    ) {
      throw new Error('Total price mismatch');
    }

    const order = Order.create({
      id: randomUUID(),
      storeId: params.storeId,
      items: params.items.map(
        (i) => new OrderItem(i.productId, i.quantity, i.price),
      ),
      totalPrice: params.totalPrice,
      orderedAt: new Date(params.orderedAt),
    });

    await this.orderRepo.save(order);
    return order;
  }

  async getOrder(id: string) {
    return this.orderRepo.findById(id);
  }
}
