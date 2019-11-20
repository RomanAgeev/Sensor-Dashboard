import { calcSensorBox } from '../dataEngine';

export const sensorBoxChart = (Highcharts => (sensorName, data, placeholderId) => {
    const chartOptions = {
        chart: {
            type: 'boxplot'
        },
        title: {
            text: `${sensorName} data distribution by class`,
        },
        xAxis: {
            categories: ['class 1', 'class -1'],
        },
        yAxis: {
            title: {
                text: 'values',
            }
        },
        series: [{
            data: calcSensorBox(data, 'sensor0'),
            name: sensorName,
        }],
    };

    Highcharts.chart(placeholderId, chartOptions);
})(Highcharts);