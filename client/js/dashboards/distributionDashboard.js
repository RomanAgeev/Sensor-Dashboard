import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';

export const distributionDashboard = ((Highcharts, $) => (data, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensorPlace = () =>
        $('<div/>')
            .css({
                width: '100%',
                height: '500px',
            });
            
    const sensorDataPlace = sensorName =>
        $('<div/>')
            .attr('id', `${sensorName}-data`)
            .css({
                'display': 'inline-block',
                'width': '70%',
                'height': '100%'
            });

    const sensorBoxPlace = sensorName =>
        $('<div/>')
        .attr('id', `${sensorName}-box`)
        .css({
            'display': 'inline-block',
            'width': '30%',
            'height': '100%'
        }); 

    getSensorNames(data).forEach((sensorName, index) => {
        const $sensorPlace = sensorPlace().appendTo(dashboardId);

        sensorDataPlace(sensorName).appendTo($sensorPlace);
        sensorBoxPlace(sensorName).appendTo($sensorPlace);

        const dataChart = sensorDataChart(sensorName, index, data.sensor_data[sensorName]);
        const boxChart = sensorBoxChart(sensorName, index, data.sensor_data);

        Highcharts.chart(`${sensorName}-data`, dataChart);
        Highcharts.chart(`${sensorName}-box`, boxChart);
    });
})(Highcharts, jQuery);
