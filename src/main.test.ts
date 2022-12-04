import { Machine, BucketConfigError } from "./Machine";

it("should return sequence provided in pdf requirements", async () => {
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
  }, Math.random() * 10); // run as fast as possible to speed up unit tests

  let result: string = "";
  const onBucketReady = (line: string) => {
    result = result + line + "\n";
  };

  const completed = await machine.load(buckets, onBucketReady);
  clearInterval(job);

  expect(completed).toEqual(true);

  const expected = `Bucket has been filled, capacity: 10 milk 8 cacao 2
Bucket has been filled, capacity: 500 milk 400 cacao 100
Bucket has been filled, capacity: 1000 milk 800 cacao 200
Bucket has been filled, capacity: 200 milk 160 cacao 40
Bucket has been filled, capacity: 1000 milk 800 cacao 200
Bucket has been filled, capacity: 300 milk 240 cacao 60
Bucket has been filled, capacity: 0 milk 0 cacao 0
Bucket has been filled, capacity: 4000 milk 3200 cacao 800
`;

  expect(result).toEqual(expected);
});

describe("edge cases", () => {
  it("resolves false for empty set of buckets", async () => {
    const machine = new Machine();
    const result = await machine.load([], jest.fn());
    expect(result).toEqual(false);
  });

  it("should manage overflowing with 2 buckets", async () => {
    const buckets = [
      {
        capacity: 10,
        milk: 0,
        cacao: 0,
      },
      {
        capacity: 100,
        milk: 0,
        cacao: 0,
      }
    ];
    const machine = new Machine();
    const job = setTimeout(() => {
      machine.addMilk(110);
      machine.addCacao(110);
    }, 10); // run as fast as possible to speed up unit tests
  
    let result: string = "";
    const onBucketReady = (line: string) => {
      result = result + line + "\n";
    };
  
    const completed = await machine.load(buckets, onBucketReady);
    clearTimeout(job);
  
    expect(completed).toEqual(true);
  
    const expected = `Bucket has been filled, capacity: 10 milk 8 cacao 2
Bucket has been filled, capacity: 100 milk 80 cacao 20
`;
  
    expect(result).toEqual(expected);
  });

  
  describe("should throw exception if bucket param has invalid params", () => {
    const machine = new Machine();
    it("cacao", async () => {
      try {
        await machine.load([{}], jest.fn());
      } catch (e: any) {
        expect(e.message).toEqual(
          "Invalid bucket configuration property type (cacao)"
        );
      }
    });

    it("milk", async () => {
      try {
        await machine.load([{ cacao: 10 }], jest.fn());
      } catch (e: any) {
        expect(e.message).toEqual(
          "Invalid bucket configuration property type (milk)"
        );
      }
    });

    it("capacity", async () => {
      try {
        await machine.load([{ cacao: 10, milk: 10 }], jest.fn());
      } catch (e: any) {
        expect(e.message).toEqual(
          "Invalid bucket configuration property type (capacity)"
        );
      }
    });
  });
});
