import { sensorDataChart } from '../charts';

export const correlationDashboard = (Highcharts => data => {
    const dataChart = sensorDataChart('sensor 0', data.sensor_data.sensor0);

    Highcharts.chart('sensor_data2', dataChart);
})(Highcharts);