import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';

const boxWidthPercentage = 24;
const classWithPercentage = (100 - boxWidthPercentage) / 2;
const height = 400;

export const distributionDashboard = ((Highcharts, $) => (data, derivatives, dashboardName) => {
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

    getSensorNames(data).forEach((sensor, index) => {
        const $sensorPlace = sensorPlace().appendTo(dashboardId);

        const classPosId = `${sensor}-pos`;
        const classNegId = `${sensor}-neg`;
        const boxId = `${sensor}-box`;

        sensorDataPlace(classPosId).appendTo($sensorPlace);
        sensorDataPlace(classNegId).appendTo($sensorPlace);
        sensorBoxPlace(boxId).appendTo($sensorPlace);

        const sensorData = derivatives.get(sensor);

        const min = Math.floor(sensorData.min);
        const max = Math.ceil(sensorData.max);

        const chartClassPos = sensorDataChart(sensor, index, sensorData.classPos, min, max, sensorData.meanPos, 'class +1');
        const chartClassNeg = sensorDataChart(sensor, index, sensorData.classNeg, min, max, sensorData.meanNeg, 'class -1');
        const chartBox = sensorBoxChart(sensor, index, sensorData, min, max);

        Highcharts.chart(classPosId, chartClassPos);
        Highcharts.chart(classNegId, chartClassNeg);
        Highcharts.chart(boxId, chartBox);
    });
})(Highcharts, jQuery);
