import { getSensorNames } from '../dataEngine'
import { sensorCorrChart } from '../charts';
import { reflow } from '../utils';

const height = 450;
const widthPercent = 33;

export const classCorrDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensors = getSensorNames(data);

    const charts = [];

    sensors.forEach(sensor => {
        const chartId = `${sensor}-class-to-class`;

        $('<div/>')
        .attr('id', chartId)
        .css({
            display: 'inline-block',
            width: `${widthPercent}%`,
            height: `${height}px`,
        })
        .appendTo(`#${dashboardId}`);

        const chart = sensorCorrChart(sensor, sensor, data, summary, '1', '-1');

        charts.push(Highcharts.chart(chartId, chart));
    });

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);