import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts/sensorCorrChart';

export const correlationDashboard = ((Highcharts, $) => (data, derivatives, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    const sensors = getSensorNames(data);

    let currentSensor = sensors[0];
    let enablePos = true;
    let enableNeg = true;

    const getRadioValue = () => {
        if (enablePos) {
            return'classPos';
        }
        if (enableNeg) {
            return 'classNeg';
        }
        console.warn('Unexpected enableClass state');
    };

    const setRadioValue = value => {
        enablePos = value === 'classPos';
        enableNeg = value === 'classNeg';
    };

    const $chartContainer = $(`${dashboardId} .correlationCharts`);

    const getSensorData = (sensor) => {
        if (enablePos) {
            return derivatives.get(sensor).classPos;
        }
        if (enableNeg) {
            return derivatives.get(sensor).classNeg;
        }
    };

    const buildCharts = () => {
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

            const chart = sensorCorrChart(currentSensor, sensor, getSensorData(currentSensor), getSensorData(sensor), index);

            Highcharts.chart(chartId, chart);
        });
    };

    $(`${dashboardId} .sensorSelect`)
        .append(sensors.map(sensor => $('<option/>').text(sensor)))
        .val(currentSensor)
        .on('change', function() {
            currentSensor = this.value;
            buildCharts();
        });

    $(`${dashboardId} input[type=radio][name=checkClass][value=${getRadioValue()}]`)
        .prop('checked', true);

    $(`${dashboardId} input[type=radio][name=checkClass]`)
        .change(function() {
            setRadioValue(this.value);
            buildCharts();
        });
        
    buildCharts();
})(Highcharts, jQuery);