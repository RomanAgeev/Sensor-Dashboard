import { calcSensorBox } from '../dataEngine';

export const sensorBoxChart = (sensorName, data) => ({
    chart: {
        type: 'boxplot'
    },
    title: {
        text: `${sensorName} data distribution by class`,
    },
    xAxis: {
        categories: ['class 1', 'class -1'],
    },
    yAxis: {
        title: {
            text: 'values',
        }
    },
    series: [{
        data: calcSensorBox(data, 'sensor0'),
        name: sensorName,
    }],
});
