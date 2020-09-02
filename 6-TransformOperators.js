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

rxjs.interval(1000)
    .pipe(
        rxjs.operators.map(x => {
            return x * 2;
        }),
        rxjs.operators.take(10)
    )
    .subscribe(createSubscribe('[operators] map'));

rxjs.of('hello', 'world', 'wtf')
    .pipe(
        rxjs.operators.map(x => x.toUpperCase())
    )
    .subscribe(createSubscribe('[operators] map'));

rxjs.fromEvent(document.querySelector('#les2Input1'), 'keyup')
    .pipe(
        // rxjs.operators.map(x => x.target.value),
        rxjs.operators.pluck('target', 'value'),
        rxjs.operators.map(x => x.toUpperCase()),
        rxjs.operators.map(x => {
            return {
                value: x,
                length: x.length
            };
        })
    )
    .subscribe(createSubscribe('[operators] map'));
