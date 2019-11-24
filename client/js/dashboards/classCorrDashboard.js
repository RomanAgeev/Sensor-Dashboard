import { getSensorNames } from '../dataEngine'
import { sensorCorrChart } from '../charts';
import { reflow, jQueryHelper } from '../utils';

const height = 450;
const widthPercent = 33;

export const classCorrDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensors = getSensorNames(data);

    const charts = [];

    sensors.forEach(sensor => {
        const chartId = `${sensor}-class-to-class`;

        jQueryHelper
            .loadingPlace(chartId, `${widthPercent}%`, `${height}px`)
            .appendTo(`#${dashboardId}`);

        setTimeout(() => {
            const chart = sensorCorrChart(sensor, sensor, data, summary, '1', '-1');
            charts.push(Highcharts.chart(chartId, chart));
        }, 0);
    });

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);