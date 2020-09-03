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

// // Part 1
// const subject$ = new rxjs.Subject();
// subject$.subscribe(createSubscribe('subject'));
// subject$.next(1);
// subject$.next(2);
// setTimeout(() => {
//   subject$.next(3);
//   subject$.complete();
// }, 2000);


// // Part 2
// const subject2$ = new rxjs.Subject();
// const int$ = rxjs.interval(1000);

// int$.subscribe(subject2$);
// subject2$.subscribe(createSubscribe('subject 2'));


// // Part 3
// const subject3$ = new rxjs.BehaviorSubject('WTF');
// subject3$.subscribe(createSubscribe('behavior'));
// subject3$.next('HELP!!!');
// subject3$.complete();


// // Part 4
// const subject4$ = new rxjs.ReplaySubject(2); // будет хранить в себе только последние 2 значения

// subject4$.next(1);
// subject4$.next(2);
// subject4$.next(3);
// subject4$.complete();

// subject4$.subscribe(createSubscribe('replay'));


// Part 5
const subject5$ = new rxjs.AsyncSubject();

subject5$.next(1);
subject5$.next('WTF');
subject5$.complete();// Возвращает только последнее значение, но если не завершить subject, то ничего не вернет

subject5$.subscribe(createSubscribe('async'));