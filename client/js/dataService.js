let rawData = null;

export const getRawData = () => {
    if (rawData) {
        return Promise.resolve(rawData)
    }

    return fetch('/data')
        .then(res => res.json())
        .then(data => {
            rawData = data;
            return data;
        });
};

export const getAllSensorsData = () =>
    getRawData()
        .then(({ sensor_data }) =>
            Object.getOwnPropertyNames(sensor_data)
                .map(name => /^sensor(\d+)$/g.exec(name))
                .filter(match => match !== null) 
                .reduce((acc, match) => {
                    const name = match[0];
                    const pos = match[1];
                    acc[pos] = sensor_data[name];
                    return acc;
                }, []));