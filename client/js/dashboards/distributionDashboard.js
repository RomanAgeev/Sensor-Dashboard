import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';

export const distributionDashboard = ((Highcharts, $) => (data, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensorPlace = () =>
        $('<div/>')
            .css({
                width: '100%',
                height: '400px',
            });
            
    const sensorDataPlace1= sensorName =>
        $('<div/>')
            .attr('id', `${sensorName}-data1`)
            .css({
                'display': 'inline-block',
                'width': '38%',
                'height': '100%'
            });

    const sensorDataPlace2 = sensorName =>
        $('<div/>')
            .attr('id', `${sensorName}-data2`)
            .css({
                'display': 'inline-block',
                'width': '38%',
                'height': '100%'
            });

    const sensorBoxPlace = sensorName =>
        $('<div/>')
        .attr('id', `${sensorName}-box`)
        .css({
            'display': 'inline-block',
            'width': '24%',
            'height': '100%'
        }); 

    getSensorNames(data).forEach((sensorName, index) => {
        const $sensorPlace = sensorPlace().appendTo(dashboardId);

        sensorDataPlace1(sensorName).appendTo($sensorPlace);
        sensorDataPlace2(sensorName).appendTo($sensorPlace);
        sensorBoxPlace(sensorName).appendTo($sensorPlace);

        const dataChart1 = sensorDataChart(sensorName, index, data.sensor_data[sensorName].slice(0, 201), 'class +1');
        const dataChart2 = sensorDataChart(sensorName, index, data.sensor_data[sensorName].slice(201, 401), 'class -1');
        const boxChart = sensorBoxChart(sensorName, index, data.sensor_data);

        Highcharts.chart(`${sensorName}-data1`, dataChart1);
        Highcharts.chart(`${sensorName}-data2`, dataChart2);
        Highcharts.chart(`${sensorName}-box`, boxChart);
    });
})(Highcharts, jQuery);
