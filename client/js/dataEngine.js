import { getColor } from './utils';

export const getSensorNames = data =>
    Object.getOwnPropertyNames(data)
        .map(name => /^sensor(\d+)$/g.exec(name))
        .filter(match => match !== null)
        .map(match => match[0]);

export const calcMedian = (values, minIndex, maxIndex) => {
    const center = minIndex + (maxIndex - minIndex) / 2;
    const leftIndex = Math.floor(center);
    const rightIndex = Math.ceil(center);
    const median = (values[leftIndex] + values[rightIndex]) / 2;
    return [median, leftIndex, rightIndex];
};

export const sliceClassData = (sensorData, classSummary) =>
    sensorData.slice(classSummary.startIndex, classSummary.startIndex + classSummary.count);

export const calcSummary = data =>
    getSensorNames(data).reduce((acc, sensor, index) => acc.set(sensor, calcSensorSummary(data, sensor, index)), new Map());

const calcSensorSummary = (data, sensor, sensorIndex) => {
    const sensorData = data[sensor];

    const summary = sensorData.reduce((acc, val, index) => {
        const classLabel = data.class_label[index].toString();

        let classData = acc.classes.get(classLabel);
        if (!classData) {
            classData = {
                startIndex: index,
                count: 0,
                min: minInit,
                max: maxInit,
                sum: 0,
                sumSquares: 0,
            };
            acc.classes.set(classLabel, classData);
        }

        classData.count++;
        classData.min = Math.min(classData.min, val);
        classData.max = Math.max(classData.max, val);
        classData.sum += val;
        classData.sumSquares += val * val;

        acc.min = Math.min(acc.min, val);
        acc.max = Math.max(acc.max, val);

        return acc;
    }, {
        min: minInit,
        max: maxInit,
        classes: new Map(),
    });

    summary.min = normMin(summary.min);
    summary.max = normMax(summary.max);
    summary.color = getColor(sensorIndex);

    summary.classes.forEach((classData, _classLabel) => {
        classData.min = normMin(classData.min);
        classData.max = normMax(classData.max);
        classData.mean = classData.sum / classData.count;
        classData.deviation = Math.sqrt((classData.sumSquares - (classData.sum * classData.sum) / classData.count) / (classData.count - 1));
    });

    return summary;
};

const minInit = Number.POSITIVE_INFINITY;
const maxInit = Number.NEGATIVE_INFINITY;
const normMin = min => Number.isFinite(min) ? min : 0;
const normMax = max => Number.isFinite(max) ? max : 1;
