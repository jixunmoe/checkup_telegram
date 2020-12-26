import {generateMessage} from "../util/generateMessage.mjs";
import {prop} from "../util/arrayHelper.mjs";

export async function handleBatchReport(req, res) {
    if (!Array.isArray(req.body)) {
        res.status(400).end();
        return;
    }

    /**
     * @type {Object[]}
     */
    const history = await req.appRoot.readCache();
    const changed = [];
    for (const item of req.body) {
        let { title, timestamp, healthy } = item;

        const prevIdx = history.findIndex(prop('title', title));
        if (prevIdx < 0) {
            changed.push({
                title,
                timestamp,
                healthy,
                delta: 0,
            });
            history.push(item);
            continue;
        }

        const prevItem = history[prevIdx];
        if (item.healthy !== prevItem.healthy) {
            history[prevIdx] = item;
            changed.push({
                title,
                timestamp,
                healthy,
                delta: Date.now() - (prevItem.timestamp / 1e6)|0,
            });
        }
    }
    res.json({ success: true });

    if (changed.length === 0) {
        return;
    }
    await req.appRoot.saveCache(history);

    const healthyChanges = changed.filter(x => x.healthy);
    const offlineChanges = changed.filter(x => !x.healthy);

    const msg = [];
    if (healthyChanges.length > 0) {
        msg.push(generateMessage('✅', '服务恢复', '累计下线', healthyChanges));
    }
    if (offlineChanges.length > 0) {
        msg.push(generateMessage('❌', '服务障碍', '已正常运行', offlineChanges));
    }

    req.appRoot.bot.postUpdate(msg.join('\n\n'));
}
