export const fetchData = async () => {
    const res = await fetch('/data');
    const data = await res.json();
    // return new Promise((resolve, reject) => setTimeout(() => resolve(data), 1000));
    return data;
};

// export const getAllSensorsData = () =>
//     getRawData()
//         .then(({ sensor_data }) =>
//             Object.getOwnPropertyNames(sensor_data)
//                 .map(name => /^sensor(\d+)$/g.exec(name))
//                 .filter(match => match !== null) 
//                 .reduce((acc, match) => {
//                     const name = match[0];
//                     const pos = match[1];
//                     acc[pos] = sensor_data[name];
//                     return acc;
//                 }, []));