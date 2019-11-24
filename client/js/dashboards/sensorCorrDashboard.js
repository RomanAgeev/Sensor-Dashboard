import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts';
import { reflow, loadingBox, errorBox, defer } from '../utils';

const height = 450;
const widthPercent = 33;

export const sensorCorrDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensors = getSensorNames(data);

    let sensorX = sensors[0];
    let classLabel = '1';

    const $chartsContainer = $(`#${dashboardId} #corrCharts`);

    const buildCharts = () => {
        $chartsContainer.empty();

        const charts = [];

        sensors.forEach(sensorY => {
            if (sensorY === sensorX) {
                return;
            }

            const chartId = `${sensorX}-${sensorY}`;

            const $chartPlace = loadingBox(chartId, `${widthPercent}%`, `${height}px`).appendTo($chartsContainer);

            defer(() => {
                const chart = sensorCorrChart(sensorX, sensorY, data, summary, classLabel, classLabel);
                return Highcharts.chart(chartId, chart);
            })
            .then(chart => charts.push(chart))
            .catch(e => {
                console.error(e);
                errorBox($chartPlace);
            });
        });

        return charts;
    };

    let charts = [];

    $(`#${dashboardId} #sensorSelect`)
        .append(sensors.map(sensor => $('<option/>').text(sensor)))
        .val(sensorX)
        .on('change', function() {
            sensorX = this.value;
            charts = buildCharts();
        });

    $(`#${dashboardId} input[type=radio][name=classSelect][value=${classLabel}]`)
        .prop('checked', true);

    $(`#${dashboardId} input[type=radio][name=classSelect]`)
        .change(function() {
            classLabel = this.value;
            charts = buildCharts();
        });
        
    charts = buildCharts();

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);