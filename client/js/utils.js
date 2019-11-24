export const readableName = sensor => {
    const match = /^(\w+)(\d+)$/g.exec(sensor);
    return `${match[1]} ${match[2]}`;
}

export const reflow = charts => charts.forEach(chart => chart.reflow());

export const getColor = index => colors[index % colors.length];

const colors = [
    '#7cb5ec',
    '#a3a3a8',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#2b908f',
    '#f45b5b',
    '#91e8e1',
];