import { sensorDataChart, sensorBoxChart } from '../charts';
import { getSensorNames } from '../dataEngine';
import { reflow, jQueryHelper } from '../utils';

const boxWidthPercentage = 24;
const classWithPercentage = (100 - boxWidthPercentage) / 2;
const height = 400;

export const sensorDistDashboard = ((Highcharts, $) => (data, summary, dashboardId) => {
    const sensorPlace = () =>
        $('<div/>')
            .css({
                width: '100%',
                height: `${height}px`,
            });
           
    const sensorDataPlace = id => jQueryHelper.loadingPlace(id, `${classWithPercentage}%`, `${height}px`);
    const sensorBoxPlace = id => jQueryHelper.loadingPlace(id, `${boxWidthPercentage}%`, `${height}px`);

    const charts = [];

    getSensorNames(data).forEach(sensor => {
        const $sensorPlace = sensorPlace().appendTo(`#${dashboardId}`);

        const classLabels = ['1', '-1'];

        classLabels.forEach(classLabel => {
            const classId = `${sensor}-data-${classLabel}`;
            sensorDataPlace(classId).appendTo($sensorPlace);

            setTimeout(() => {
                const chartData = sensorDataChart(sensor, data, summary, classLabel);
                charts.push(Highcharts.chart(classId, chartData));
            }, 0);
        });

        const boxId = `${sensor}-box`;
        sensorBoxPlace(boxId).appendTo($sensorPlace);
        
        setTimeout(() => {
            const chartBox = sensorBoxChart(sensor, data, summary, classLabels);
            charts.push(Highcharts.chart(boxId, chartBox));    
        }, 0);
    });

    return {
        activate: () => reflow(charts),
    };
})(Highcharts, jQuery);
