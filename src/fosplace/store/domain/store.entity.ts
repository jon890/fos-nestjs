export class Store {
  constructor(
    public readonly id: bigint,
    public readonly name: string,
    public readonly isOpen: boolean,
  ) {}

  canAcceptOrder(): boolean {
    return this.isOpen;
  }

  open() {
    return new Store(this.id, this.name, true);
  }

  close() {
    return new Store(this.id, this.name, false);
  }
}
