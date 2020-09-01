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

function delay(ms = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

delay(3000).then(() => {
    console.log('Prommise was resolved!');
});

const p$ = rxjs.from(delay(4000));
p$.subscribe(createSubscribe('fromPromise'))