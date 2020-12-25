import TelegrafContext from 'telegraf/context.js';

/// <reference path="telegraf/typings/context.d.ts" />

/**
 * @param {TelegrafContext|any} ctx
 * @returns {Promise<void>}
 */
export async function handleChannel(ctx) {
    if (ctx.channelPost?.text === 'get my chat id') {
        ctx.reply(`channel chat id is \`${ctx.chat.id}\``, {
            parse_mode: "MarkdownV2",
        }).catch(console.error);
    }
}
