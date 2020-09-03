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

// // Part 1
// const s1$ = rxjs.of('Hello');
// const s2$ = rxjs.of('World');

// rxjs.zip(s1$.pipe(rxjs.operators.delay(2000)), s2$.pipe(rxjs.operators.delay(5000)))
//   .subscribe(createSubscribe('zip'));


// // Part 2
// const interval$ = rxjs.interval(1000);

// rxjs
//   .zip(
//     interval$,
//     interval$.pipe(rxjs.operators.take(3)),
//     rxjs.of("Some text")
//   )
//   .subscribe(createSubscribe('zip2'));


// // Part 3
// const si1$ = rxjs.interval(1000);
// const si2$ = rxjs.interval(500);

// si1$
//   .pipe(
//     rxjs.operators.withLatestFrom(si2$),
//     rxjs.operators.take(5)
//   )
//   .subscribe(createSubscribe('withLatestFrom'));

// Part 3
const t1$ = rxjs.timer(1000, 2000);
const t2$ = rxjs.timer(2000, 2000);
const t3$ = rxjs.timer(3000, 2000);

rxjs.combineLatest(t1$, t2$, t3$)
  .pipe(rxjs.operators.take(5))
  .subscribe(createSubscribe('combineLatest'));
  