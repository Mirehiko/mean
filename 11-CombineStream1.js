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
const s1$ = rxjs.of('Hello');
const s2$ = rxjs.of('world');

rxjs.merge(s1$, s2$)
  .subscribe(createSubscribe('merge'));


// Part 2
const as1$ = rxjs.interval(1000).pipe(rxjs.operators.map(x => 'Stream 1:' + x));
const as2$ = rxjs.interval(500).pipe(rxjs.operators.map(x => 'Stream 2:' + x));

rxjs
  .merge(as1$, as2$)
  .pipe(
    rxjs.operators.take(12)
  )
  .subscribe(createSubscribe('merge: intervals'));


// Part 3
rxjs
  .range(1, 3)
  .pipe(
    rxjs.operators.map(x => rxjs.range(1, 3)),
    rxjs.operators.mergeAll()
  )
  .subscribe(createSubscribe('mergeAll'));


// Part 4
const s13$ = rxjs.from([1, 2, 3]);
const s23$ = rxjs.from([4, 5, 6]);

rxjs.concat(s13$, s23$).subscribe(createSubscribe('concat'));


// Part 4
rxjs
  .range(1, 3)
  .pipe(
    rxjs.operators.map(x => rxjs.range(x, 3)),
    rxjs.operators.concatAll()
  )
  .subscribe(createSubscribe('concatAll'));