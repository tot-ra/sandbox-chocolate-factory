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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Machine_1 = __importDefault(require("./Machine"));
const onBucketReady = console.log;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const buckets = [
        {
            capacity: 10,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 1000,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 500,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 4000,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 200,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 1000,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 300,
            milk: 0,
            cacao: 0,
        },
        {
            capacity: 0,
            milk: 0,
            cacao: 0,
        },
    ];
    const machine = new Machine_1.default();
    const job = setInterval(() => {
        machine.addMilk(Math.random() * 100);
        machine.addCacao(Math.random() * 100);
    }, Math.random() * 10);
    yield machine.load(buckets, onBucketReady);
    clearInterval(job);
    console.log("Finished filling all the buckets");
}))();
