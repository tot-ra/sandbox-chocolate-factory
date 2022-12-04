const CHOCOLATE_RATIO = 0.2;

class Bucket {
  constructor(
    public capacity: number,
    private milk: number,
    private cacao: number
  ) {}

  public isFull(): boolean {
    return this.milk + this.cacao === this.capacity;
  }

  public toString(): string {
    return `capacity: ${this.capacity} milk ${this.milk} cacao ${this.cacao}`;
  }

  // returns remaining capacity
  public addMilk(amount: number): number {
    const availableCapacity = this.capacity * (1 - CHOCOLATE_RATIO) - this.milk;
    if (amount <= availableCapacity) {
      this.milk += amount;
      return 0;
    } else {
      this.milk += availableCapacity;
      return amount - availableCapacity;
    }
  }

  // returns remaining capacity
  public addCacao(amount: number): number {
    const availableCapacity = this.capacity * CHOCOLATE_RATIO - this.cacao;
    if (amount <= availableCapacity) {
      this.cacao += amount;
      return 0;
    } else {
      this.cacao += availableCapacity;
      return amount - availableCapacity;
    }
  }
}

export class Machine {
  private buckets: Bucket[] = [];
  private onBucketReady: (v: Bucket) => void = () => {};

  constructor() {}

  private hasBuckets() {
    return this.buckets.length > 0;
  }

  private checkBucketFills() {
    if (this.hasBuckets() && this.buckets[0].isFull()) {
      const removedBucket = this.buckets[0];
      this.buckets.shift();
      this.onBucketReady(removedBucket);
    }
  }

  private swapActiveBuckets() {
    if (
      this.buckets.length > 1 &&
      this.buckets[1].capacity <= this.buckets[0].capacity
    ) {
      const tmp = this.buckets[1];
      this.buckets[1] = this.buckets[0];
      this.buckets[0] = tmp;
    }
  }

  public addMilk(amount: number) {
    if (!this.buckets.length) return;

    this.swapActiveBuckets();
    const overflow = this.buckets[0].addMilk(amount);

    if (overflow > 0 && this.buckets.length > 1) {
      this.buckets[1].addMilk(overflow);
    }

    this.checkBucketFills();
    this.checkBucketFills();
  }

  public addCacao(amount: number) {
    if (!this.buckets.length) return;

    this.swapActiveBuckets();
    const overflow = this.buckets[0].addCacao(amount);

    if (overflow > 0 && this.buckets.length > 1) {
      this.buckets[1].addCacao(overflow);
    }

    this.checkBucketFills();
    this.checkBucketFills();
  }

  async load(buckets: any, onBucketReady: (v: string) => void): Promise<boolean> {
    if(!buckets.length){
      return Promise.resolve(false);
    }

    return new Promise((resolve: any, reject: any) => {
      buckets.forEach((v: any) => {
        if (typeof v.cacao !== "number") {
          reject(new BucketConfigError('cacao'));
        }
        if (typeof v.milk !== "number") {
          reject(new BucketConfigError('milk'));
        }
        if (typeof v.capacity !== "number") {
          reject(new BucketConfigError('capacity'));
        }
        this.buckets.push(new Bucket(v.capacity, v.milk, v.cacao));
      });

      this.onBucketReady = (bucket: Bucket) => {
        onBucketReady("Bucket has been filled, " + bucket.toString());

        if (!this.hasBuckets()) {
          resolve(true);
        }
      };
    });
  }
}

export class BucketConfigError extends Error {
  constructor(propertyName: string) {
    super(`Invalid bucket configuration property type (${propertyName})`);
    this.name = "BucketConfigError";
  }
}