import readableTime from "./readableTime.mjs";

export function generateDetails(deltaDesc, item, items) {
    let msg = [];
    if (item.delta) {
        msg.push(deltaDesc);
        msg.push(' <code>');
        msg.push(readableTime(item.delta));
        msg.push('</code>');
    } else {
        msg.push('第一次记录');
    }

    const time = items.times?.find(time => time.rtt);
    if (time?.rtt) {
        const rtt = (time.rtt / 1e6) | 0;

        msg.push(', 响应时间 <code>');
        msg.push(readableTime(rtt));
        msg.push('</code>');
    }

    return msg.join('');
}

export function generateMessage(emoji, description, deltaDesc, items) {
    let msg = [];
    msg.push(emoji);
    msg.push(' ');
    msg.push(description);

    for(const item of items) {
        msg.push('\n');
        msg.push('- ');
        msg.push(item.title);
        msg.push(' (');
        msg.push(generateDetails(deltaDesc, item, items));
        msg.push(')');
    }

    return msg.join('');
}