import { getSensorNames } from '../dataEngine';
import { sensorCorrChart } from '../charts/sensorCorrChart';

const height = 450;
const widthPercent = 33;

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

    const getSensorData = sensorData => {
        if (enablePos) {
            return sensorData.classPos;
        }
        if (enableNeg) {
            return sensorData.classNeg;
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
                    width: `${widthPercent}%`,
                    height: `${height}px`,
                })
                .appendTo($chartContainer);

            const currentSensorData = derivatives.get(currentSensor);
            const sensorData =  derivatives.get(sensor);

            const chart = sensorCorrChart(currentSensor, sensor, getSensorData(currentSensorData), getSensorData(sensorData),
                currentSensorData.min, currentSensorData.max, sensorData.min, sensorData.max, index);

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