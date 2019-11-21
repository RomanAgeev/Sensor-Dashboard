import { getChartColor } from './chartUtils';


export const sensorDataChart = (sensorName, index, sensorData) => ({
    chart: {
        type: 'line',
    },
    title: {
        text: `${sensorName} data`,
    },
    xAxis: {
    },
    yAxis: {
        min: 0,
        title: {
            text: 'value',
        }
    },
    series: [{
        data: sensorData,
        name: sensorName,
        color: getChartColor(index),
    }]
});
