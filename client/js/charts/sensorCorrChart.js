import { getChartColor } from './chartUtils';

export const sensorCorrChart = (sensorA, sensorB, dataA, dataB, index) => ({
    chart: {
        type: 'scatter',
    },
    title: {
        text: `${sensorA} vs ${sensorB}`,
    },
    xAxis: {
        title: {
            text: sensorA,
        },
    },
    yAxis: {
        title: {
            text: sensorB,
        },
    },
    series: [{
        name: 'values',
        showInLegend: false,
        data: dataA.map((valA, index) => [valA, dataB[index]]),
        color: getChartColor(index),
    }],
});
