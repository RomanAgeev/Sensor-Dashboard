export const sensorDataChart = (sensorName, sensorData) => ({
    chart: {
        type: 'line',
    },
    title: {
        text: `${sensorName} data`,
    },
    xAxis: {
    },
    yAxis: {
        title: {
            text: 'value',
        }
    },
    series: [{
        data: sensorData,
        name: sensorName,
    }]
});
