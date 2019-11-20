import { sensorDataChart, sensorBoxChart } from '../charts';

export const distributionDashboard = (Highcharts => data => {
    const dataChart = sensorDataChart('sensor 0', data.sensor_data.sensor0);
    const boxChart = sensorBoxChart('sensor 0', data.sensor_data);

    Highcharts.chart('sensor_data', dataChart);
    Highcharts.chart('sensor_dist', boxChart);
})(Highcharts);