import { getSensorNames } from '../dataEngine'
import { sensorCorrChart } from '../charts';

const height = 450;
const widthPercent = 33;

export const classCorrDashboard = ((Highcharts, $) => (data, summary, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensors = getSensorNames(data);

    sensors.forEach(sensor => {
        const chartId = `${sensor}-class-to-class`;

        $('<div/>')
        .attr('id', chartId)
        .css({
            display: 'inline-block',
            width: `${widthPercent}%`,
            height: `${height}px`,
        })
        .appendTo(dashboardId);

        const chart = sensorCorrChart(sensor, sensor, data, summary, '1', '-1');

        Highcharts.chart(chartId, chart);
    });

})(Highcharts, jQuery);