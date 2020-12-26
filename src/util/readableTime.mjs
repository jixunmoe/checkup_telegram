const timeUnits = [
    // size, suffix, len
    [1000, 'ms', 3],
    [60, ' ', 2],
    [60, ':', 2],
    [24, ':', 2],
];

export default function readableTime(ms) {
    let time = ms;
    const result = [];
    for(const [size, suffix, len] of timeUnits) {
        const value = time % size;
        result.push(`${value.toString().padStart(len, '0')}${suffix}`);
        time = (time / size) | 0;
        if (time <= 0) {
            break;
        }
    }
    if (time > 0) {
        // no padding required for days
        result.push(`${time}d `);
    }
    return result.reverse().join('');
}