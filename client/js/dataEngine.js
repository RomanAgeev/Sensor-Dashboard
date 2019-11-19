export const calcSensorBox = (data, sensorName) => {
    const sensorData = data[sensorName];

    const { classPos, classNeg } = sensorData.reduce((acc, val, index) => {
        const classLabel = data.class_label[index];
        if (classLabel === 1) {
            acc.classPos.push(val);
        } else if (classLabel === -1) {
            acc.classNeg.push(val);
        } else {
            console.warn(`Unexpected class lable ${classLabel}`);
        }
        return acc;
    }, {
        classPos: [],
        classNeg: [],
    });

    return [
        calcBox(classPos),
        calcBox(classNeg),
    ];
};

const calcBox = values => {
    values.sort();
    const [median, medianIndexLeft, medianIndexRight] = calcMedian(values, 0, values.length - 1);
    const leftQuart = calcMedian(values, 0, medianIndexLeft - 1)[0];
    const rightQuart = calcMedian(values, medianIndexRight + 1, values.length - 1)[0];

    return [values[0], leftQuart, median, rightQuart, values[values.length - 1]];
};

const calcMedian = (values, minIndex, maxIndex) => {
    const center = minIndex + (maxIndex - minIndex) / 2;
    const leftIndex = Math.floor(center);
    const rightIndex = Math.ceil(center);
    const median = (values[leftIndex] + values[rightIndex]) / 2;
    return [median, leftIndex, rightIndex];
};
