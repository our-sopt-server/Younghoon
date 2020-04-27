const calculator = require('./calculator');

const a =10;
const b = 5;
const sum = calculator.sum(a,b)
const sub = calculator.sub(a,b)
const mul = calculator.multiply(a,b)
const div = calculator.divide(a,b)

console.log('a = 10, b = 5');
console.log(sum)
console.log(sub)
console.log(mul)
console.log(div)