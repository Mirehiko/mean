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

rxjs
  .of()// если имеется значение, то будет выведено оно
  .pipe(rxjs.operators.defaultIfEmpty('I\'m empty stream'))
  .subscribe(createSubscribe('of: defaultEmpty'));

rxjs
  .from([1, 2, 3, 4, 5])
  .pipe(rxjs.operators.every(x => x % 2 === 0))
  .subscribe(createSubscribe('  from: every (will be false)'));
rxjs
  .from([1, 2, 3, 4, 5])
  .pipe(
    // rxjs.operators.map(x => x * 2),
    // rxjs.operators.every(x => x % 2 === 0)
    rxjs.operators.skipWhile(x => x <= 3),
    rxjs.operators.every(x => x > 2)
  )
  .subscribe(createSubscribe('  from: every (will be true)'));

rxjs
  .range(1, 3)
  .pipe(
    rxjs.operators.tap(x => console.log('Before:', x)),
    rxjs.operators.map(x => x * x),
    rxjs.operators.tap(x => console.log('After:', x))
  )
  .subscribe(createSubscribe('range: do'));

rxjs
  .range(1, 3)
  .pipe(
    rxjs.operators.map(x => x * x),
    rxjs.operators.delay(2000)
  )
  .subscribe(createSubscribe('  range: delay'));

// rxjs
//   .range(1, 3)
//   .pipe(
//     rxjs.operators.map(x => x + 1),
//     rxjs.operators.let(observer => observer.map(x => x * x)),
//   )
//   .subscribe(createSubscribe('--range: let'));
