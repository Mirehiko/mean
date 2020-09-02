function createSubscribe(name) {
    return {
        next(x) {
            console.log(`${name}:`, x);
        },
        error(err) {
            console.log(`Error:`, err);
        },
        complete() {
            console.log(`${name}:`, 'Completed');
        }
    }
}

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.first())
    .subscribe(createSubscribe('first'));

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.last())
    .subscribe(createSubscribe('last'));

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.find(x => x === 5))
    .subscribe(createSubscribe('last'));

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.findIndex(x => x === 5))
    .subscribe(createSubscribe('findIndex'));

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.take(2))
    .subscribe(createSubscribe('take'));

rxjs.of(1, 5, 'Hello', 'World')
    .pipe(rxjs.operators.skip(2))
    .subscribe(createSubscribe('skip'));

    rxjs.of(1, 3, 5, 7, 9, 13, 'Hello', 'World')
    .pipe(rxjs.operators.skipWhile(x => {
        return typeof x == 'number';
    }))
    .subscribe(createSubscribe('skipWhile'));

rxjs.interval(500)
    .pipe(
        rxjs.operators.skipWhile(x => x < 5),
        rxjs.operators.takeWhile(x => x < 15)
    )
    .subscribe(createSubscribe('skipWhile <-> takeWhile'));

rxjs.interval(500)
    .pipe(
        rxjs.operators.skipUntil(rxjs.timer(3000)),
        rxjs.operators.takeUntil(rxjs.timer(6000)),
    )
    .subscribe(createSubscribe('skipUntil <=> takeUntil'));
    