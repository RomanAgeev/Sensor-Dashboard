// TODO: remove

// import { getRawData, getAllSensorsData } from './channel';
// import { calcSensorBox } from './dataEngine';
// import { sensorDataChart, sensorBoxChart } from './charts';

// export const dashboard = (function(Highcharts) {
//     return function() {
//         const getChart = (name, type) => ({
//             chart: {
//                 type
//             },
//             title: {
//                 text: name
//             },
//             xAxis: {

//             },
//             yAxis: {
//                 title: {
//                     text: 'values'
//                 }
//             },
//             series: [{
//                 name
//             }]
//         });

//         // getAllSensorsData()
//         //     .then(data => {
//         //         console.log(data);
//         //     });


//         getRawData()
//             .then(({ sensor_data })  => {
//                 const sensor0 = sensor_data.sensor0
//                 const sensor1 = sensor_data.sensor1;
//                 const sensor2 = sensor_data.sensor2;
                
//                 const step = 0.1;
                
//                 const sensorDistChart = getChart('Sensor 0 dist', 'column');
//                 const sensor0Dist = sensor0.reduce((acc, value) => {
//                     const bucket = Math.floor(value / step);
//                     acc[bucket]++;
//                     return acc;
//                 }, new Array(1 / step).fill(0));
//                 const sensor1Dist = sensor1.reduce((acc, value) => {
//                     const bucket = Math.floor(value / step);
//                     acc[bucket]++;
//                     return acc;
//                 }, new Array(1 / step).fill(0));
//                 const sensor2Dist = sensor2.reduce((acc, value) => {
//                     const bucket = Math.floor(value / step);
//                     acc[bucket]++;
//                     return acc;
//                 }, new Array(1 / step).fill(0));
//                 sensorDistChart.series = [{
//                     name: 'sensor0',
//                     data: sensor0Dist
//                 }, {
//                     name: 'sensor1',
//                     data: sensor1Dist
//                 }, {
//                     name: 'sensor2',
//                     data: sensor2Dist
//                 }];

//                 sensorDataChart('sensor 0', sensor0, 'sensor_data');
//                 sensorBoxChart('sensor 0', sensor_data, 'sensor_dist');

//                 Highcharts.chart('sensor_dist2', sensorDistChart);
//             });
//     };
// })(Highcharts);