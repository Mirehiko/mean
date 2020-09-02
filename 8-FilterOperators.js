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

const cars = [
  {
    name: "Audi",
    price: 500,
  },
  {
    name: "BMW",
    price: 300,
  },
  {
    name: "Porche",
    price: 400,
  },
];

rxjs
  .range(0, 10)
  .pipe(rxjs.operators.filter((x) => x > 3))
  .subscribe(createSubscribe("filter"));

rxjs
  .fromEvent(document.querySelector("#filterInp"), "keyup")
  .pipe(rxjs.operators.map((e) => e.target.value))
  .subscribe((x) => {
    rxjs
      .from(cars)
      .pipe(rxjs.operators.filter((c) => c.name === x))
      .subscribe((v) => {
        document.querySelector(
          "#filterDiv"
        ).innerHTML = `<h2>${v.name.toUpperCase()}</h2><h4>${v.price}</h4>`;
      });
  });

rxjs
  .fromEvent(document.querySelector("#filterInp"), "keyup")
  .pipe(
    rxjs.operators.map((e) => e.target.value),
    rxjs.operators.debounceTime(1000), // задержка перед обработкой события
    rxjs.operators.distinct(), // исключает нажатия стрелкой
  )
  .subscribe(createSubscribe('debounceTime and distict'));

rxjs
  .from([1, 2, 3, 3, 3, 5, 5, 1, 1, 99, 99, 2, 4, 6])
  .pipe(rxjs.operators.distinctUntilChanged())
  .subscribe(createSubscribe('distinctUntilChanged'));
