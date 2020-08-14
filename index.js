const _ = require('lodash');// lesson 1
const util = require('util');// lesson 2
const EventEmitter = require('events').EventEmitter;// lesson 2
const fs = require('fs'); // lesson 3

var Car = require('./car').Car;// lesson 1

// lesson 1
console.log(_.sum([4,6]))

const bmw = new Car('BMW');
bmw.logName();



// lesson 2
function BMW(name) {
    this.carName = name || 'Unknown model';
}

BMW.prototype.drive = function() {
    console.log(` is driving`);
}

util.inherits(BMW, Car);

const bmw2 = new BMW('X6');
bmw2.logName();
bmw2.drive();

// Events
var dispatcher = new EventEmitter();

dispatcher.on('connect', function(data) {
    console.log('Connect 1', data);
});

dispatcher.on('connect', function(data) {
    console.log('Connect 2', data);
});

dispatcher.on('error', function(err) {
    console.warn(err);
});

dispatcher.emit('connect', {foo: 1});

dispatcher.emit('error', new Error('Somethin went wrong'));


// lesson 3

// синхронная запись/чтение файла (блокирует поток исполнения)
fs.writeFileSync('test.txt', 'hello world');

// var data = fs.readFileSync('test.txt').toString();
var data = fs.readFileSync('test.txt', {encoding: 'utf8'});
console.log(data);


// асинхронная запись/чтение файла (не блокирует поток исполнения)
fs.writeFile('test2.txt', 'Ohaiyo sekai, good morning world', function(err) {
    if (err) throw new Error(err);

    fs.rename('test2.txt', 'test2-renamed.txt', function(err) {
     if (err) throw new Error(err);

     fs.readFile('test2-renamed.txt', {encoding: 'utf8'}, function(err, data) {
         if (err) throw new Error(err);
 
         console.log(data);
     });
    });
});