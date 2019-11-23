import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts';

const height = 450;
const widthPercent = 33;

export const sensorCorrDashboard = ((Highcharts, $) => (data, summary, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensors = getSensorNames(data);

    let sensorX = sensors[0];
    let classLabel = '1';

    const $chartContainer = $(`${dashboardId} .correlationCharts`);

    const buildCharts = () => {
        $chartContainer.empty();

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

            const chart = sensorCorrChart(sensorX, sensorY, data, summary, classLabel);

            Highcharts.chart(chartId, chart);
        });
    };

    $(`${dashboardId} .sensorSelect`)
        .append(sensors.map(sensor => $('<option/>').text(sensor)))
        .val(sensorX)
        .on('change', function() {
            sensorX = this.value;
            buildCharts();
        });

    $(`${dashboardId} input[type=radio][name=checkClass][value=${classLabel}]`)
        .prop('checked', true);

    $(`${dashboardId} input[type=radio][name=checkClass]`)
        .change(function() {
            classLabel = this.value;
            buildCharts();
        });
        
    buildCharts();
})(Highcharts, jQuery);