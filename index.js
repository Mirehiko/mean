var stream$ = rxjs.Observable.create(function(observer) {
    observer.next('one');

    setTimeout(function() {
        observer.next('after 3 sec');
    }, 3000);

    setTimeout(function() {
        // observer.complete();
        observer.error('Somethin went wrong');
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