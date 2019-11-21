import { getChartColor } from './chartUtils';


export const sensorDataChart = (sensorName, index, sensorData, className) => ({
    chart: {
        type: 'line',
    },
    title: {
        text: `${sensorName} (${className})`,
    },
    xAxis: {
    },
    yAxis: {
        min: 0,
        max: 1,
        title: {
            text: null,
        },
    },
    series: [{
        data: sensorData,
        name: sensorName,
        showInLegend: false,
        color: getChartColor(index),
    }]
});
