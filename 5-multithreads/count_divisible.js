import { isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) throw new Error('Код должен быть запущен в Worker Thread');

const { array, number } = workerData;

let count = 0;
for (const num of array) {
    if (num % number === 0) count++;
}

parentPort.postMessage(count);
