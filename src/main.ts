import { Machine } from './Machine';

const onBucketReady = console.log;

(async () => {
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
  const machine = new Machine();
  const job = setInterval(() => {
    machine.addMilk(Math.random() * 100);
    machine.addCacao(Math.random() * 100);
  }, Math.random() * 10);

  await machine.load(buckets, onBucketReady);
  clearInterval(job);
  console.log("Finished filling all the buckets");
})();
