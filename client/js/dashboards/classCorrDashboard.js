import { getSensorNames } from '../dataEngine'
import { sensorCorrChart } from '../charts';
import { reflow, loadingBox, errorBox, defer } from '../utils';

const height = 450;
const widthPercent = 33;

export const classCorrDashboard = (Highcharts => (data, summary, dashboardId) => {
    const sensors = getSensorNames(data);

    const charts = [];

    sensors.forEach(sensor => {
        const chartId = `${sensor}-class-to-class`;

        const $chartPlace = loadingBox(chartId, `${widthPercent}%`, `${height}px`).appendTo(`#${dashboardId}`);

        defer(() => {
            const chart = sensorCorrChart(sensor, sensor, data, summary, '1', '-1');
            return Highcharts.chart(chartId, chart);
        })
        .then(chart => charts.push(chart))
        .catch(e => {
            console.error(e);
            errorBox($chartPlace);
        });
    });

    return {
        activate: () => reflow(charts),
    };
})(Highcharts);