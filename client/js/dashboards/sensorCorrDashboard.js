import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts';
import { reflow } from '../utils';

const height = 450;
const widthPercent = 33;

export const sensorCorrDashboard = ((Highcharts, $) => (data, summary, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensors = getSensorNames(data);

    let sensorX = sensors[0];
    let classLabel = '1';

    const $chartContainer = $(`${dashboardId} #corrCharts`);

    const buildCharts = () => {
        $chartContainer.empty();

        const charts = [];

        sensors.forEach(sensorY => {
            if (sensorY === sensorX) {
                return;
            }

            const chartId = `${sensorX}-${sensorY}`;

            $('<div/>')
                .attr('id', chartId)
                .css({
                    display: 'inline-block',
                    width: `${widthPercent}%`,
                    height: `${height}px`,
                })
                .appendTo($chartContainer);

            const chart = sensorCorrChart(sensorX, sensorY, data, summary, classLabel, classLabel);

            charts.push(Highcharts.chart(chartId, chart));
        });

        return charts;
    };

    let charts = [];

    $(`${dashboardId} #sensorSelect`)
        .append(sensors.map(sensor => $('<option/>').text(sensor)))
        .val(sensorX)
        .on('change', function() {
            sensorX = this.value;
            charts = buildCharts();
        });

    $(`${dashboardId} input[type=radio][name=classSelect][value=${classLabel}]`)
        .prop('checked', true);

    $(`${dashboardId} input[type=radio][name=classSelect]`)
        .change(function() {
            classLabel = this.value;
            charts = buildCharts();
        });
        
    charts = buildCharts();

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);