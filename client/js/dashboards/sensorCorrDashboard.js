import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts';
import { reflow, jQueryHelper } from '../utils';

const height = 450;
const widthPercent = 33;

export const sensorCorrDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensors = getSensorNames(data);

    let sensorX = sensors[0];
    let classLabel = '1';

    const $chartPlace = $(`#${dashboardId} #corrCharts`);

    const buildCharts = () => {
        $chartPlace.empty();

        const charts = [];

        sensors.forEach(sensorY => {
            if (sensorY === sensorX) {
                return;
            }

            const chartId = `${sensorX}-${sensorY}`;

            jQueryHelper
                .loadingPlace(chartId, `${widthPercent}%`, `${height}px`)
                .appendTo($chartPlace);

            setTimeout(() => {
                const chart = sensorCorrChart(sensorX, sensorY, data, summary, classLabel, classLabel);
                charts.push(Highcharts.chart(chartId, chart));
            }, 0);
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