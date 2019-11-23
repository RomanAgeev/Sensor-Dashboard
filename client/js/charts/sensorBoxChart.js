import { calcMedian, sliceClassData } from '../dataEngine';
import { readableName } from '../utils';

export const sensorBoxChart = (sensor, data, summary, classLabels) => {
    const sensorData = data[sensor];
    if (!sensorData) {
        throw new Error(`Data doens't exist for the '${sensor}' sensor`);
    }

    const sensorSummary = summary.get(sensor)
    if (!sensorSummary) {
        throw new Error(`Summary doesn't exist for the '${sensor}' sensor`);
    }

    const classSummaries = classLabels
        .map(classLabel => sensorSummary.classes.get(classLabel))
        .filter(classSummary => !!classSummary);

    if (classSummaries.length < classLabels.length) {
        throw new Error(`${classLabels.length - classSummaries.length} of ${classLabels.length} classes are not present in data`);
    }

    const seriesData = classSummaries
        .map(classSummary => sliceClassData(sensorData, classSummary))
        .map(classData => classData.sort())
        .map(values => {
            const [median, medianIndexLeft, medianIndexRight] = calcMedian(values, 0, values.length - 1);
            const leftQuart = calcMedian(values, 0, medianIndexLeft - 1)[0];
            const rightQuart = calcMedian(values, medianIndexRight + 1, values.length - 1)[0];
            return [
                values[0],
                leftQuart,
                median,
                rightQuart,
                values[values.length - 1]
            ];
        });

    const categories = classLabels.map(classLabel => `Class ${classLabel}`);

    const min = Math.floor(sensorSummary.min);
    const max = Math.ceil(sensorSummary.max);

    const sensorName = readableName(sensor);

    return {
        chart: {
            type: 'boxplot'
        },
        title: {
            text: `${sensorName} (by class)`,
        },
        xAxis: {
            categories,
        },
        yAxis: {
            min,
            max,
            title: {
                text: null,
            },
        },
        series: [{
            data: seriesData,
            name: sensorName,
            showInLegend: false,
            color: sensorSummary.color,
        }],
    };
};
