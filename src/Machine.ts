const CHOCOLATE_RATIO = 0.2;

class Bucket {
  constructor(
    public capacity: number,
    private milk: number,
    private cacao: number
  ) {}

  isFull(): boolean {
    return this.milk + this.cacao === this.capacity;
  }

  toString(): string {
    return `capacity: ${this.capacity} milk ${this.milk} cacao ${this.cacao}`;
  }

  addMilk(amount: number): number {
    //console.log('Adding milk'+this.capacity);
    const availableCapacity = this.capacity * (1 - CHOCOLATE_RATIO) - this.milk;
    if (amount <= availableCapacity) {
      this.milk += amount;
      return 0;
    } else {
      this.milk += availableCapacity;
      return availableCapacity - amount;
    }
  }
  addCacao(amount: number): number {
    const availableCapacity = this.capacity * CHOCOLATE_RATIO - this.cacao;
    if (amount <= availableCapacity) {
      this.cacao += amount;
      return 0;
    } else {
      this.cacao += availableCapacity;
      return availableCapacity - amount;
    }
  }
}

export default class Machine {
  private buckets: Bucket[] = [];
  private onBucketReady: (v: Bucket) => void = () => {};

  constructor() {}

  private checkBucketFills() {
    if (this.buckets.length > 0 && this.buckets[0].isFull()) {
      this.onBucketReady(this.buckets[0]);
      this.buckets.shift();
    }
  }

  swapActiveBuckets(){
    if (this.buckets.length > 1 && this.buckets[1].capacity <= this.buckets[0].capacity) {
      const tmp = this.buckets[1];
      this.buckets[1] = this.buckets[0];
      this.buckets[0] = tmp;
    }
  }

  addMilk(amount: number) {
    if (!this.buckets.length) return;

    this.swapActiveBuckets();
    const overflow = this.buckets[0].addMilk(amount);
    if (overflow > 0) {
      this.buckets[1].addMilk(amount);
    }

    this.checkBucketFills();
    this.checkBucketFills();
  }

  addCacao(amount: number) {
    if (!this.buckets.length) return;

    this.swapActiveBuckets();
    const overflow = this.buckets[0].addCacao(amount);
    if (overflow > 0) {
      this.buckets[1].addCacao(overflow);
    }

    this.checkBucketFills();
    this.checkBucketFills();
  }

  async load(buckets: any, onBucketReady: (v: string) => void) {
    buckets.forEach((v: any) => {
      this.buckets.push(new Bucket(v.capacity, v.milk, v.cacao));
    });

    this.onBucketReady = (bucket: Bucket) => {
      onBucketReady("Bucket has been filled, " + bucket.toString());
    };

    return new Promise((resolve: any) => {
      setTimeout(resolve, 10000);
    });
  }
}