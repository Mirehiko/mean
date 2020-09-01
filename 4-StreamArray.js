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
    