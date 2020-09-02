function createSubscribe(name) {
  return {
    next(x) {
      console.log(`${name}:`, x);
    },
    error(err) {
      console.log(`Error:`, err);
    },
    complete() {
      console.log(`${name}:`, "Completed");
    },
  };
}

// Part 1
// rxjs.of('Hello')
//   .subscribe(x => {
//     rxjs.of(x + ' world')
//       .subscribe(createSubscribe('mergeMap'));
//   });
rxjs.of('Hello')
  .pipe(
    rxjs.operators.mergeMap(x => {
      return rxjs.of(x + ' world')
    })
  )
  .subscribe(createSubscribe('mergeMap'));


// Part 2
const promise = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + ' wish you good luck');
    }, 2000);
  });
}

rxjs.of('WTF')
  .pipe(
    rxjs.operators.mergeMap((x) => {
      return promise(x);
    })
  )
  .subscribe(createSubscribe('promise'))


// Part 3
rxjs.range(1, 10)
  .pipe(
    rxjs.operators.concatMap((x, i) => {
      return rxjs.interval(100)
        .pipe(
          rxjs.operators.take(x),
          rxjs.operators.map(q => i)
        )
    })
  )
  .subscribe(createSubscribe('concatMap'));
