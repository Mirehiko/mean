function createSubscribe(name) {
  return {
    next(x) {
      console.log(`${name}:`, x);
    },
    error(err) {
      console.log(`${name}:`, err);
    },
    complete() {
      console.log(`${name}:`, "Completed");
    },
  };
}

// Part 1
rxjs.throwError(new Error('What happening?'))
  .pipe(rxjs.operators.catchError(error => rxjs.of(error)))// в принципе, в данном варианте все корректно отрабатывает, но если раскоментить код ниже, то без этого пункта никак
  // .subscribe((x) => {
  //   console.log(x);
  // });
  .subscribe(createSubscribe('[throw, catch]'));
rxjs.interval(500).pipe(rxjs.operators.take(2)).subscribe(createSubscribe('interval'));


// Part 2
const err1$ = rxjs.throwError(new Error('What\'s happening?'));
const int$ = rxjs.interval(500).pipe(rxjs.operators.take(2));

err1$.pipe(rxjs.operators.onErrorResumeNext(int$))
  .subscribe(createSubscribe('onErrorResumeNext'));