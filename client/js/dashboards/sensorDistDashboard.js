import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';

const boxWidthPercentage = 24;
const classWithPercentage = (100 - boxWidthPercentage) / 2;
const height = 400;

export const sensorDistDashboard = ((Highcharts, $) => (data, summary, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensorPlace = () =>
        $('<div/>')
            .css({
                width: '100%',
                height: `${height}px`,
            });
           
    const sensorDataPlace = id =>
        $('<div/>')
            .attr('id', id)
            .css({
                'display': 'inline-block',
                'width': `${classWithPercentage}%`,
                'height': '100%'
            });

    const sensorBoxPlace = id =>
        $('<div/>')
        .attr('id', id)
        .css({
            'display': 'inline-block',
            'width': `${boxWidthPercentage}%`,
            'height': '100%'
        }); 

    getSensorNames(data).forEach(sensor => {
        const $sensorPlace = sensorPlace().appendTo(dashboardId);

        const classLabels = ['1', '-1'];

        classLabels.forEach(classLabel => {
            const classId = `${sensor}-data-${classLabel}`;
            sensorDataPlace(classId).appendTo($sensorPlace);
            const chartData = sensorDataChart(sensor, data, summary, classLabel);

            Highcharts.chart(classId, chartData);
        });

        const boxId = `${sensor}-box`;
        sensorBoxPlace(boxId).appendTo($sensorPlace);
        const chartBox = sensorBoxChart(sensor, data, summary, classLabels);

        Highcharts.chart(boxId, chartBox);
    });
})(Highcharts, jQuery);
