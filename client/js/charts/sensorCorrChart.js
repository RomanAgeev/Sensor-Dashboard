import { readableName } from '../utils';

export const sensorCorrChart = (sensorX, sensorY, data, summary, classLabel) => {
    const sensorDataX = data[sensorX];
    if (!sensorDataX) {
        throw new Error(`Data doens't exist for the '${sensorX}' sensor`);
    }

    const sensorDataY = data[sensorY];
    if (!sensorDataY) {
        throw new Error(`Data doens't exist for the '${sensorY}' sensor`);
    }

    const summaryX = summary.get(sensorX);
    if (!summaryX) {
        throw new Error(`Summary doesn't exist for the '${sensorX}' sensor`);
    }

    const summaryY = summary.get(sensorY);
    if (!summaryY) {
        throw new Error(`Summary doesn't exist for the '${sensorY}' sensor`);
    }

    const classSummaryX = summaryX.classes.get(classLabel);
    if (!classSummaryX) {
        throw new Error(`The '${classLabel}' class doesn't exist in the '${sensorX}' sensor data`);
    }

    const classSummaryY = summaryY.classes.get(classLabel);
    if (!classSummaryY) {
        throw new Error(`The '${classLabel}' class doesn't exist in the '${sensorY}' sensor data`);
    }

    if (classSummaryX.count !== classSummaryY.count) {
        throw new Error(`The ${classLabel} class data have different length between ${sensorX} and ${sensorY}`);
    }

    const n = classSummaryX.count;

    let seriesData = [];

    let covariance = 0;
    for (let i = 0; i < n; i++) {
        const valX = sensorDataX[classSummaryX.startIndex + i];
        const valY = sensorDataY[classSummaryY.startIndex + i];

        covariance += (valX - classSummaryX.mean) * (valY - classSummaryY.mean);

        seriesData.push([valX, valY]);
    }
    covariance /= (n - 1);

    const correlation = covariance / (classSummaryX.deviation * classSummaryY.deviation);

    const rSquared = (correlation * correlation * 100).toFixed(2);

    const a = correlation * classSummaryY.deviation / classSummaryX.deviation;
    const b = classSummaryY.mean - a * classSummaryX.mean;

    const minX = Math.floor(classSummaryX.min);
    const maxX = Math.ceil(classSummaryX.max);
    const minY =  Math.floor(classSummaryY.min);
    const maxY = Math.ceil(classSummaryY.max);

    const p1 = [minX, a * minX + b];
    const p2 = [maxX, a * maxX + b];

    const nameX = readableName(sensorX);
    const nameY = readableName(sensorY);

    return {
        chart: {
            type: 'scatter',
        },
        title: {
            text: `${nameX} - ${nameY}`,
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolRadius: 0,
        },
        xAxis: {
            min: minX,
            max: maxX,
            title: {
                text: nameX,
            },
            gridLineWidth: 1,
        },
        yAxis: {
            min: minY,
            max: maxY,
            title: {
                text: nameY,
            },
        },
        series: [{
            name: 'values',
            showInLegend: false,
            data: seriesData,
            color: summaryY.color,
        }, {
            type: 'line',
            name: `R\u00b2 = ${rSquared}%`,
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
            enableMouseTracking: false,
        }],
    };
};
