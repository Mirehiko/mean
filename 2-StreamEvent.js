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