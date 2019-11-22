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

            const sensorDataA = derivatives.get(currentSensor);
            const sensorDataB =  derivatives.get(sensor);

            const dataA = getSensorData(sensorDataA);
            const dataB = getSensorData(sensorDataB);

            let xy = 0;
            for (let i = 0; i < dataA.length; i++) {
                xy += (dataA[i] - sensorDataA.meanPos) * (dataB[i] - sensorDataB.meanPos);
            }

            xy /= sensorDataA.deviationPos * sensorDataA.deviationPos;

            const r = xy / (dataA.length - 1);

            // const r = xy / Math.sqrt(sensorDataA.sumSquaresNeg * sensorDataB.sumSquaresNeg);

            const a = r * sensorDataB.deviationPos / sensorDataA.deviationPos;
            const b = sensorDataB.meanPos - a * sensorDataA.meanPos;

            const p1 = [sensorDataA.min, a * sensorDataA.min + b];
            const p2 = [sensorDataA.max, a * sensorDataA.max + b];

            const chart = sensorCorrChart(currentSensor, sensor, dataA, dataB,
                sensorDataA.min, sensorDataA.max, sensorDataB.min, sensorDataB.max, index,
                    sensorDataA.meanPos, sensorDataB.meanPos, sensorDataA.deviationPos, sensorDataB.deviationPos, p1, p2, (r * r * 100).toFixed(2));

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