const timeArgs = process.argv.slice(2);

let timeSec = 0;
const appliedUnits = { }; // Нужно, чтобы одну единицу времени нельзя было указать несколько раз
for (const timeArg of timeArgs) {
    const parsedArg = timeArg.match(/^(\d+)(\w+)$/);
    if (parsedArg === null) throw new Error(`Передан непонятный параметр '${timeArg}'`);

    const [_, count, unitName] = parsedArg;

    if (appliedUnits[unitName] !== undefined) {
        throw new Error(`Элемент времени ${unitName} был передан дважды`);
    }

    let ratio;
    switch (unitName) {
        case 's':
            ratio = 1;
            break;
        case 'm':
            ratio = 60;
            break;
        case 'h':
            ratio = 3600;
            break;
        default:
            throw new Error(`Передана неизвестная единица времени ${unitName}`);
    }

    timeSec += parseInt(count) * ratio; // проверки на NaN нет, потому что /\d/
                                        // гарантирует возврат натурального числа
    appliedUnits[unitName] = true; 
}

setTimeout(console.log, timeSec * 1000, 'Таймер!');
