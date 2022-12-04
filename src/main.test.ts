import Machine from './Machine';

it('should return sequence provided in pdf requirements', async()=>{
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
      }, Math.random() * 1); // run as fast as possible to speed up unit tests
    
      let result: string = '';
      const onBucketReady = (line: string)=>{
        result = result + line + "\n";
      };

      await machine.load(buckets, onBucketReady);
      clearInterval(job);

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