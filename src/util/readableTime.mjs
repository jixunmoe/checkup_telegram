const timeUnit = [1000, 60, 60, 24];
const timeUnitName = ['ms', ' ', ':', ':'];
export default function readableTime(ms) {
    let time = ms;
    const result = [];
    for(let i = 0; i < timeUnit.length && ms > 0; i++) {
        const unit = timeUnit[i];
        const name = timeUnitName[i];
        const value = time % unit;
        result.push(`${value}${name}`);
        time = (time / unit) | 0;
    }
    if (time > 0) {
        result.push(`${time}d `);
    }
    return result.reverse().join('');
}