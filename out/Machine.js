"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CHOCOLATE_RATIO = 0.2;
class Bucket {
    constructor(capacity, milk, cacao) {
        this.capacity = capacity;
        this.milk = milk;
        this.cacao = cacao;
    }
    isFull() {
        return this.milk + this.cacao === this.capacity;
    }
    toString() {
        return `capacity: ${this.capacity} milk ${this.milk} cacao ${this.cacao}`;
    }
    addMilk(amount) {
        const availableCapacity = this.capacity * (1 - CHOCOLATE_RATIO) - this.milk;
        if (amount <= availableCapacity) {
            this.milk += amount;
            return 0;
        }
        else {
            this.milk += availableCapacity;
            return availableCapacity - amount;
        }
    }
    addCacao(amount) {
        const availableCapacity = this.capacity * CHOCOLATE_RATIO - this.cacao;
        if (amount <= availableCapacity) {
            this.cacao += amount;
            return 0;
        }
        else {
            this.cacao += availableCapacity;
            return availableCapacity - amount;
        }
    }
}
class Machine {
    constructor() {
        this.buckets = [];
        this.onBucketReady = () => { };
    }
    hasBuckets() {
        return this.buckets.length > 0;
    }
    checkBucketFills() {
        if (this.hasBuckets() && this.buckets[0].isFull()) {
            const removedBucket = this.buckets[0];
            this.buckets.shift();
            this.onBucketReady(removedBucket);
        }
    }
    swapActiveBuckets() {
        if (this.buckets.length > 1 &&
            this.buckets[1].capacity <= this.buckets[0].capacity) {
            const tmp = this.buckets[1];
            this.buckets[1] = this.buckets[0];
            this.buckets[0] = tmp;
        }
    }
    addMilk(amount) {
        if (!this.buckets.length)
            return;
        this.swapActiveBuckets();
        const overflow = this.buckets[0].addMilk(amount);
        if (overflow > 0) {
            this.buckets[1].addMilk(overflow);
        }
        this.checkBucketFills();
        this.checkBucketFills();
    }
    addCacao(amount) {
        if (!this.buckets.length)
            return;
        this.swapActiveBuckets();
        const overflow = this.buckets[0].addCacao(amount);
        if (overflow > 0) {
            this.buckets[1].addCacao(overflow);
        }
        this.checkBucketFills();
        this.checkBucketFills();
    }
    load(buckets, onBucketReady) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    buckets.forEach((v) => {
                        this.buckets.push(new Bucket(v.capacity, v.milk, v.cacao));
                    });
                    this.onBucketReady = (bucket) => {
                        onBucketReady("Bucket has been filled, " + bucket.toString());
                        if (!this.hasBuckets()) {
                            resolve();
                        }
                    };
                    setTimeout(() => {
                        reject("Machine is too slow");
                    }, 100);
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = Machine;
