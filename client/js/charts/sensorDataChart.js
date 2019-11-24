import { readableName } from '../utils';
import { sliceClassData } from '../dataEngine';

export const sensorDataChart = (sensor, data, summary, classLabel) => {
    const sensorData = data[sensor];
    if (!sensorData) {
        throw new Error(`Data doens't exist for the '${sensor}' sensor`);
    }

    const sensorSummary = summary.get(sensor)
    if (!sensorSummary) {
        throw new Error(`Summary doesn't exist for the '${sensor}' sensor`);
    }

    const classSummary = sensorSummary.classes.get(classLabel);
    if (!classSummary) {
        throw new Error(`The '${classLabel}' class doesn't exist in the '${sensor}' sensor data`);
    }

    const seriesData = sliceClassData(sensorData, classSummary);
    const sensorName = readableName(sensor);
    const title = `${sensorName} (class ${classLabel})`;

    const min = Math.floor(sensorSummary.min);
    const max = Math.ceil(sensorSummary.max);
    const mean = classSummary.mean;

    return {
        chart: {
            type: 'line',
        },
        plotOptions: {
            series: {
                animation: false,
            }
        },
        title: {
            text: title,
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
            data: seriesData,
            name: sensorName,
            showInLegend: false,
            color: sensorSummary.color,
            zIndex: 1,
        }]
    };
};
