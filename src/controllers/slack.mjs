import readableTime from "../util/readableTime.mjs";

const emojis = new Map([
    ['good', '✅'],
    ['danger', '❌'],
]);

const statusMap = new Map([
    ['good', '恢复'],
    ['danger', '下线'],
]);

export function handleSlackRoute(req, res) {
    /** @type {SlackWebHookBody} */
    const body = req.body;

    if (body.username !== req.appRoot.config.checkup) {
        res.statusCode = 400;
        res.end();
        return;
    }

    const attachment = req.body.attachments[0];
    const isGood = attachment.color === 'good';
    const fields = new Map();
    for (const field of attachment.fields) {
        fields.set(field.title, field.value);
    }

    const colour = attachment.color;
    let msg = `${emojis.get(colour)} <i>${body.text}</i> 于 <code>${new Date().toISOString()}</code> ${statusMap.get(colour)}。`;
    if (isGood) {
        const downTime = readableTime(fields.get('Downtime')-0);
        msg += `\n累计下线时长 <code>${downTime}</code>。`;
    }

    req.appRoot.bot.postUpdate(msg);
    res.json({success: true});
}
