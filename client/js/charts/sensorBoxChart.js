import { getChartColor } from './chartUtils';
import { calcMedian } from '../dataEngine';

export const sensorBoxChart = (sensor, index, sensorData, min, max) => ({
    chart: {
        type: 'boxplot'
    },
    title: {
        text: `${sensor} (by class)`,
    },
    xAxis: {
        categories: ['Class +1', 'Class -1'],
    },
    yAxis: {
        min,
        max,
        title: {
            text: null,
        },
    },
    series: [{
        data: [
            calcBox(sensorData.classPos),
            calcBox(sensorData.classNeg),
        ],
        name: sensor,
        showInLegend: false,
        color: getChartColor(index),
    }],
});

const calcBox = values => {
    const sortedValues = [...values].sort();

    const [median, medianIndexLeft, medianIndexRight] = calcMedian(sortedValues, 0, sortedValues.length - 1);
    const leftQuart = calcMedian(sortedValues, 0, medianIndexLeft - 1)[0];
    const rightQuart = calcMedian(sortedValues, medianIndexRight + 1, sortedValues.length - 1)[0];

    return [sortedValues[0], leftQuart, median, rightQuart, sortedValues[values.length - 1]];
};
