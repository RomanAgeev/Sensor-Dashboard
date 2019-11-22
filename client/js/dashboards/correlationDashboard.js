import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts/sensorCorrChart';

export const correlationDashboard = ((Highcharts, $) => (data, derivatives, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensors = getSensorNames(data);

    const $chartContainer = $(`${dashboardId} .correlationCharts`);

    const buildCharts = currentSensor => {
        $chartContainer.empty();

        sensors.forEach((sensor, index) => {
            if (sensor === currentSensor) {
                return;
            }

            const chartId = `${currentSensor}-${sensor}`;

            $('<div/>')
                .attr('id', chartId)
                .css({
                    display: 'inline-block',
                    width: '33%',
                    height: '500px',
                })
                .appendTo($chartContainer);

            const chart = sensorCorrChart(currentSensor, sensor, derivatives.get(currentSensor).classPos, derivatives.get(sensor).classPos, index);

            Highcharts.chart(chartId, chart);
        });
    };

    const initialSensor = sensors[0];

    $(`${dashboardId} .sensorSelect`)
        .append(sensors.map(sensor => $('<option/>').text(sensor)))
        .val(initialSensor)
        .on('change', function() {
            buildCharts(this.value);
        });
        
    buildCharts(initialSensor);

})(Highcharts, jQuery);