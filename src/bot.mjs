import {handleChannel} from "./handler/channel_handler.mjs";
import Telegraf from "telegraf";

const handlers = new Map([
    ['channel_post', handleChannel],
]);

export async function startBot(app) {
    const bot = new Telegraf(app.config.token || process.env.BOT_TOKEN);
    bot.use(async (ctx, next) => {
        ctx.app = app;
        if (handlers.has(ctx.updateType)) {
            const handler = handlers.get(ctx.updateType);
            if (handler) {
                await handler(ctx);
            }
        }
        return next();
    });
    bot.launch().catch((err) => {
        console.error('bot launch failed!', err);
    });
    return {
        bot,
        postUpdate(msg) {
            bot.telegram.sendMessage(app.config.channel, msg, {
                disable_web_page_preview: true,
                parse_mode: 'MarkdownV2'
            })
        }
    };
}
