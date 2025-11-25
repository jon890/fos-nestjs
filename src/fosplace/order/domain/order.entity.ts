export type OrderStatus =
  | 'CREATED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'COMPLETED';

export class OrderItem {
  constructor(
    public productId: string,
    public quantity: number,
    public price: number,
  ) {}
}

export class Order {
  constructor(
    public id: string,
    public storeId: string,
    public items: OrderItem[],
    public totalPrice: number,
    public status: OrderStatus,
    public orderedAt: Date,
  ) {}

  static create(params: {
    id: string;
    storeId: string;
    items: OrderItem[];
    totalPrice: number;
    orderedAt: Date;
  }) {
    return new Order(
      params.id,
      params.storeId,
      params.items,
      params.totalPrice,
      'CREATED',
      params.orderedAt,
    );
  }
}
