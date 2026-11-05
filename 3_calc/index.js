if (process.argv.length !== 5) {
    throw new Error ('Должно быть передано 3 аргумента: 2 числа и операция');
}

const [num1, num2] = process.argv.slice(2, 4).map(parseFloat);
if (isNaN(num1 + num2)) throw new Error('Передано не число');

const operation = process.argv[4];
if (operation === 'index') throw new Error('Передана неизвестная операция');

try {
    // Берём функцию операции из нужного файла 
    const operationFunc = require(`./${operation}.js`);
    console.log(operationFunc(num1, num2));
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') throw new Error('Передана неизвестная операция');
    console.error('Произошла неизвестная ошибка');
}

