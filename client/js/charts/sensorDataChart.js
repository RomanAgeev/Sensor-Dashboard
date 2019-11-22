import { getChartColor } from './chartUtils';

export const sensorDataChart = (sensor, index, data, min, max, mean, className) => ({
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
        plotLines: [{
            value: mean,
            color: 'black',
            dashStyle: 'shortdash',
            width: 2,
            zIndex: 4,
            label: {
                text: `mean (${mean.toFixed(2)})`,
                style: {
                    fontWeight: 'bold',
                }
            },
        }],
    },
    series: [{
        data,
        name: sensor,
        showInLegend: false,
        color: getChartColor(index),
        zIndex: 1,
    }]
});
