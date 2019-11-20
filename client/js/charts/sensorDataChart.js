export const sensorDataChart = (Highcharts => (sensorName, sensorData, placeholderId) => {
    const chartOptions = {
        chart: {
            type: 'line',
        },
        title: {
            text: `${sensorName} data`,
        },
        xAxis: {
            title: {
                text: 'sample',
            }
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
    };

    Highcharts.chart(placeholderId, chartOptions);
})(Highcharts);
