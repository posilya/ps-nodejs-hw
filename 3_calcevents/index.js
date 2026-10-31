const EventEmitter = require('node:events');

const { add } = require('./add.js');
const { divide } = require('./divide.js');
const { multiply } = require('./multiply.js');
const { subtract } = require('./subtract.js');

if (process.argv.length !== 5) {
    throw new Error ('Должно быть передано 3 аргумента: 2 числа и операция');
}

const [num1, num2] = process.argv.slice(2, 4).map(parseFloat);
if (isNaN(num1 + num2)) throw new Error('Передано не число');

const operation = process.argv[4];

const calcEmitter = new EventEmitter();

calcEmitter
    .addListener('add', add)
    .addListener('divide', divide)
    .addListener('multiply', multiply)
    .addListener('subtract', subtract);

calcEmitter.emit(operation, num1, num2);
