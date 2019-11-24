import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';
import { reflow, loadingBox, errorBox, defer } from '../utils';

const classLabels = ['1', '-1'];
const boxWidthPercentage = 24;
const classWidthPercentage = (100 - boxWidthPercentage) / classLabels.length;
const height = 400;

export const sensorDistDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensorPlace = () =>
        $('<div/>')
            .css({
                width: '100%',
                height: `${height}px`,
            });
           
    const sensorDataPlace = id => loadingBox(id, `${classWidthPercentage}%`, `${height}px`);
    const sensorBoxPlace = id => loadingBox(id, `${boxWidthPercentage}%`, `${height}px`);

    const charts = [];

    getSensorNames(data).forEach(sensor => {
        const $sensorPlace = sensorPlace().appendTo(`#${dashboardId}`);

        classLabels.forEach(classLabel => {
            const classId = `${sensor}-data-${classLabel}`;
            const $dataPlace = sensorDataPlace(classId).appendTo($sensorPlace);

            defer(() => {
                const dataChart = sensorDataChart(sensor, data, summary, classLabel);
                return Highcharts.chart(classId, dataChart);
            })
            .then(chart => charts.push(chart))
            .catch(e => {
                console.error(e);
                errorBox($dataPlace);
            });
        });

        const boxId = `${sensor}-box`;
        const $boxPlace = sensorBoxPlace(boxId).appendTo($sensorPlace);
        
        defer(() => {
            const boxChart = sensorBoxChart(sensor, data, summary, classLabels);
            return Highcharts.chart(boxId, boxChart);
        })
        .then(chart => charts.push(chart))
        .catch(e => {
            console.error(e);
            errorBox($boxPlace);
        });
    });

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);
