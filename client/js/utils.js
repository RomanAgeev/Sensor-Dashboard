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

export const loadingBox = ($ => (id, width, height) =>
    $('<div/>')
        .attr('id', id)
        .css({
            display: 'inline-block',
            width,
            height,
            'text-align': 'center',
            'vertical-align': 'middle',
            'line-height': height,
            color: '#808080',
        })
        .text('Loading...')
)(jQuery);

export const errorBox = $box => $box.css({ color: '#8B0000' }).text("Error");

export const defer = action => new Promise((res, rej) => {
    setTimeout(() => {
        let result;
        try {
            result = action();
        } catch (e) {
            rej(e);
            return;
        }
        res(result);
    }, 0)
});