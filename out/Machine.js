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
exports.BucketConfigError = exports.Machine = void 0;
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
    // returns remaining capacity
    addMilk(amount) {
        const availableCapacity = this.capacity * (1 - CHOCOLATE_RATIO) - this.milk;
        if (amount <= availableCapacity) {
            this.milk += amount;
            return 0;
        }
        else {
            this.milk += availableCapacity;
            return amount - availableCapacity;
        }
    }
    // returns remaining capacity
    addCacao(amount) {
        const availableCapacity = this.capacity * CHOCOLATE_RATIO - this.cacao;
        if (amount <= availableCapacity) {
            this.cacao += amount;
            return 0;
        }
        else {
            this.cacao += availableCapacity;
            return amount - availableCapacity;
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
        if (overflow > 0 && this.buckets.length > 1) {
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
        if (overflow > 0 && this.buckets.length > 1) {
            this.buckets[1].addCacao(overflow);
        }
        this.checkBucketFills();
        this.checkBucketFills();
    }
    load(buckets, onBucketReady) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!buckets.length) {
                return Promise.resolve(false);
            }
            return new Promise((resolve, reject) => {
                buckets.forEach((v) => {
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
                this.onBucketReady = (bucket) => {
                    onBucketReady("Bucket has been filled, " + bucket.toString());
                    if (!this.hasBuckets()) {
                        resolve(true);
                    }
                };
            });
        });
    }
}
exports.Machine = Machine;
class BucketConfigError extends Error {
    constructor(propertyName) {
        super(`Invalid bucket configuration property type (${propertyName})`);
        this.name = "BucketConfigError";
    }
}
exports.BucketConfigError = BucketConfigError;
