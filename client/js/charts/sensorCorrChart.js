import { getChartColor } from './chartUtils';

export const sensorCorrChart = (sensorA, sensorB, dataA, dataB, minA, maxA, minB, maxB, index) => ({
    chart: {
        type: 'scatter',
    },
    title: {
        text: `${sensorA} vs ${sensorB}`,
    },
    xAxis: {
        min: minA,
        max: maxA,
        title: {
            text: sensorA,
        },
    },
    yAxis: {
        min: minB,
        max: maxB,
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
