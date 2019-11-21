import { getSensorNames } from '../dataEngine';

export const correlationDashboard = ((Highcharts, $) => (data, derivatives, dashboardName) => {
    const dashboardId = `#${dashboardName}`;

    $('<div/>')
        .attr('id', 'dist-chart')
        .css({
            width: '500px',
            height: '500px',
        })
        .appendTo(dashboardId);

    const sensors = getSensorNames(data);
    const sensor0 = derivatives.get(sensors[0]).classPos;
    const sensor1 = derivatives.get(sensors[1]).classPos;

    const seriesData = [];
    for (let i = 0; i < sensor0.length; i++) {
        seriesData.push([sensor0[i], sensor1[i]]);
    }

    const chart = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        series: [{
            name: 'TODO',
            data: seriesData,
        }],
    };

    Highcharts.chart('dist-chart', chart);
})(Highcharts, jQuery);