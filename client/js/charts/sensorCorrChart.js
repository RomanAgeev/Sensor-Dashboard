import { getChartColor } from './chartUtils';

export const sensorCorrChart = (sensorA, sensorB, dataA, dataB, minA, maxA, minB, maxB, index, meanA, meanB, devA, devB, p1, p2, r) => ({
    chart: {
        type: 'scatter',
    },
    title: {
        text: `${sensorA} vs ${sensorB}`,
    },
    legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolRadius: 0,
    },
    xAxis: {
        min: minA,
        max: maxA,
        title: {
            text: sensorA,
        },
        gridLineWidth: 1,
        /*plotLines: [{
            value: meanA,
            color: 'black',
            dashStyle: 'shortdash',
            width: 2,
            zIndex: 4,
            label: {
                text: `mean (${meanA.toFixed(2)})`,
                style: {
                    fontWeight: 'bold',
                }
            },
        }],*/
    },
    yAxis: {
        min: minB,
        max: maxB,
        title: {
            text: sensorB,
        },
        /*plotLines: [{
            value: meanB,
            color: 'black',
            dashStyle: 'shortdash',
            width: 2,
            zIndex: 4,
            label: {
                text: `mean (${meanB.toFixed(2)})`,
                style: {
                    fontWeight: 'bold',
                }
            },
        }],*/
    },
    series: [{
        name: 'values',
        showInLegend: false,
        data: dataA.map((valA, index) => [valA, dataB[index]]),
        color: getChartColor(index),
    }
    , {
        type: 'line',
        name: `R\u00b2 = ${r}%`,
        data: [p1, p2],
        color: 'black',
        dashStyle: 'shortdash',
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }],
});
