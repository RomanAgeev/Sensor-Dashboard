import { getChartColor } from './chartUtils';


export const sensorDataChart = (sensor, index, data, min, max, className) => ({
    chart: {
        type: 'line',
    },
    title: {
        text: `${sensor} (${className})`,
    },
    xAxis: {
    },
    yAxis: {
        min,
        max,
        title: {
            text: null,
        },
    },
    series: [{
        data,
        name: sensor,
        showInLegend: false,
        color: getChartColor(index),
    }]
});
