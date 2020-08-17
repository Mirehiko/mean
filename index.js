const optimist = require('optimist');


// console.log(optimist.argv)

var message = optimist.argv.message;

console.log(`Hello ${message}`);

// for (let i = 2; i < process.argv.length; i++) {
//     console.log(process.argv[i])
// }