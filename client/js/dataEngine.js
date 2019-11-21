export const getSensorNames = data =>
    Object.getOwnPropertyNames(data.sensor_data)
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
