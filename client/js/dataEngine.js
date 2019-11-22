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

export const calcDerivatives = data =>
    getSensorNames(data).reduce((acc, sensor) => acc.set(sensor, calcSensorDerivatives(data, sensor)), new Map());

const calcSensorDerivatives = (data, sensor) => {
    const sensorData = data[sensor];

    const derivatives = sensorData.reduce((acc, val, index) => {
        const classLabel = data.class_label[index];
        if (classLabel === 1) {
            acc.sumPos += val;
            acc.sumSquaresPos += val * val;
            acc.classPos.push(val);
        } else if (classLabel === -1) {
            acc.sumNeg += val;
            acc.sumSquaresNeg += val * val;
            acc.classNeg.push(val);
        } else {
            console.warn(`Unexpected class label ${classLabel}`);
        }

        acc.min = Math.min(acc.min, val);
        acc.max = Math.max(acc.max, val);

        return acc;
    }, {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
        sumPos: 0,
        sumNeg: 0,
        sumSquaresPos: 0,
        sumSquaresNeg: 0,
        classPos: [],
        classNeg: [],
    });

    if (!Number.isFinite(derivatives.min)) {
        derivatives.min = 0;
    }
    if (!Number.isFinite(derivatives.max)) {
        derivatives.max = 1;
    }
    derivatives.meanPos = derivatives.sumPos / derivatives.classPos.length;
    derivatives.meanNeg = derivatives.sumNeg / derivatives.classNeg.length;

    derivatives.deviationPos = Math.sqrt((derivatives.sumSquaresPos - (derivatives.sumPos * derivatives.sumPos) / derivatives.classPos.length) / (derivatives.classPos.length - 1));
    derivatives.deviationNeg = Math.sqrt((derivatives.sumSquaresNeg - (derivatives.sumNeg * derivatives.sumNeg) / derivatives.classNeg.length) / (derivatives.classNeg.length - 1));

    return derivatives;
};
