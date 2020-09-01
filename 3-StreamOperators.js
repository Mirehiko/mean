function createSubscribe(name) {
    return {
        next(x) {
            console.log(`${name}:`, x);
        },
        error(err) {
            console.log(`Error:`, x);
        },
        complete() {
            console.log(`${name}:`, 'Completed');
        }
    }
}
rxjs.of(5, '9', 4, '5', 'string', [4, 2, 5])
    .subscribe(createSubscribe('of'));

rxjs.interval(500)
    .pipe(rxjs.operators.take(15))
    .subscribe(createSubscribe('interval'));

rxjs.timer(4000, 500)
    .pipe(rxjs.operators.take(10))
    .subscribe(createSubscribe('timer'));
    
rxjs.range(3, 6)
    .subscribe(createSubscribe('range'));
