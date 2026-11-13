import { Worker } from 'node:worker_threads';
import os from 'node:os';

/** Количество ядер процессора */
const CPU_CORES = os.cpus().length;

function countDivisible(arr, number) {
    performance.mark('linear start');

    let count = 0;
    for (const num of arr) {
        if (num % number === 0) count++;
    }

    performance.mark('linear end');
    performance.measure('linear', 'linear start', 'linear end');

    return count;
}

async function countDivisibleWorkerThread(arr, number) {
    performance.mark('workerThread start');

    const workers = [];
    const sliceSize = arr.length / CPU_CORES;
    for (let i = 0; i < CPU_CORES; i++) {
        workers.push(new Promise((resolve, reject) => {
            const worker = new Worker('./count_divisible.js', {
                workerData: {
                    array: arr.slice(i * sliceSize, (i + 1) * sliceSize),
                    number
                }
            });

            let answer;
            worker.on('message', (msg) => { answer = msg });
            worker.on('error', (err) => { reject(err) });
            worker.on('exit', () => { resolve(answer) });
        }));
    }
    const count = (await Promise.all(workers))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    performance.mark('workerThread end');
    performance.measure('workerThread', 'workerThread start', 'workerThread end');

    return count;
}

const nums = [];
for (let i = 1; i <= 300_000; i++) {
    nums.push(i);
}

const linearRes = countDivisible(nums, 3);
const workerThreadRes = await countDivisibleWorkerThread(nums, 3);

const linearMeasure = performance.getEntriesByName('linear')[0].duration;
const workerThreadMeasure = performance.getEntriesByName('workerThread')[0].duration;

console.log(`Метод прямого прохода выполнился за ${linearMeasure}ms, результат: ${linearRes}`);
console.log(
    `Многопоточный подход выполнился за ${workerThreadMeasure}ms, результат: ${workerThreadRes}`
);
