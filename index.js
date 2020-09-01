// Lesson 1
var stream$ = rxjs.Observable.create(function(observer) {
    observer.next('one');

    setTimeout(function() {
        observer.next('after 3 sec');
    }, 3000);

    setTimeout(function() {
        // observer.complete();
        observer.error('Something went wrong');
    }, 2000);

    setTimeout(function() {
        observer.next('after 6 sec');
    }, 6000);

    observer.next('two');
});

stream$.subscribe(function(data) {
    console.log('Subscribe', data);
}, function(error) {
    console.log('Error', error);
}, function() {
    console.log('Completed');
});

// Lesson 2
const btn = document.querySelector('#btnClick');
const btn$ = rxjs.fromEvent(btn, 'click');
btn$.subscribe(function(e) {
    console.log(e)
});

rxjs.fromEvent(document.querySelector('#les2Input1'), 'keyup')
    .subscribe(e => console.log(e));

rxjs.fromEvent(document, 'mousemove')
    .subscribe(e => {
        document.querySelector('#mousepos').innerHTML = `x: ${e.clientX}, Y: ${e.clientY}`;
    });

// Lesson 3
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

// Lesson 4

rxjs.from([1, 2, 3, 4])
    .subscribe(createSubscribe('from array 1'));

const arrfrom = [
    {
        id: 1,
        name: 'WTF1'
    },
    {
        id: 2,
        name: 'WTF2'
    }
];

rxjs.from(arrfrom)
    .subscribe(createSubscribe('from array 2'));

const set = new Set([1, 2, 3, '4', '5', {id: 6}]);
rxjs.from(set)
    .subscribe(createSubscribe('from set'));

const map = new Map([[1, 2], [3, '4'], ['5', {id: 6}]]);
rxjs.from(map)
    .subscribe(createSubscribe('from map'));