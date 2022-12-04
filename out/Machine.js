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
    getRemainingCapacity() {
        return this.capacity - this.milk - this.cacao;
    }
    toString() {
        return `capacity: ${this.capacity} milk ${this.milk} cacao ${this.cacao}`;
    }
    addMilk(amount) {
        //console.log('Adding milk'+amount);
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
        //console.log('Adding cacao'+amount);
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
    addMilk(amount) {
        if (!this.buckets.length)
            return;
        if (this.buckets[0].getRemainingCapacity() >
            this.buckets[1].getRemainingCapacity()) {
            const overflow = this.buckets[0].addMilk(amount);
            if (overflow > 0) {
                this.buckets[1].addMilk(amount);
            }
        }
        else {
            const overflow = this.buckets[1].addMilk(amount);
            if (overflow > 0) {
                this.buckets[0].addMilk(amount);
            }
        }
        if (this.buckets[0].isFull()) {
            this.onBucketReady(this.buckets[0]);
        }
        if (this.buckets[0].isFull()) {
            this.onBucketReady(this.buckets[0]);
        }
    }
    addCacao(amount) {
        if (!this.buckets.length)
            return;
        const overflow = this.buckets[0].addCacao(amount);
        if (overflow > 0) {
            this.buckets[1].addCacao(overflow);
        }
        if (this.buckets[0].isFull()) {
            this.onBucketReady(this.buckets[0]);
        }
        if (this.buckets[0].isFull()) {
            this.onBucketReady(this.buckets[0]);
        }
    }
    load(buckets, onBucketReady) {
        return __awaiter(this, void 0, void 0, function* () {
            buckets.forEach((v) => {
                this.buckets.push(new Bucket(v.capacity, v.milk, v.cacao));
            });
            this.onBucketReady = (bucket) => {
                onBucketReady("Bucket has been filled, " + bucket.toString());
                this.buckets.shift();
            };
            return new Promise((resolve) => {
                setTimeout(resolve, 10000);
            });
            //while(this.buckets.length>0){}
        });
    }
}
exports.default = Machine;
