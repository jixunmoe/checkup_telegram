import path from 'path';
import {promises as fs} from "fs";

import {startBot} from "./bot.mjs";
import {startExpress} from "./web.mjs";

const CONFIG_FILE = process.env.CHECKUP_TG_BOT_CONFIG || 'config.json';

export class App {
    static async readJSON(path, defaultValue) {
        try {
            const configJson = await fs.readFile(path, 'utf-8');
            return JSON.parse(configJson);
        } catch (err) {
            if (!defaultValue) {
                throw err;
            }
        }
        return defaultValue;
    }
    static async readConfig() {
        return App.readJSON(CONFIG_FILE);
    }

    async main() {
        this.config = await App.readConfig();
        this.bot = await startBot(this);
        this.web = await startExpress(this);
    }

    /**
     * @returns {Promise<Object[]>}
     */
    async readCache() {
        return App.readJSON(this.config.cache, []);
    }

    async saveCache(data) {
        await fs.mkdir(path.dirname(this.config.cache), {recursive: true});
        await fs.writeFile(this.config.cache, JSON.stringify(data), 'utf-8');
    }
}

const app = new App();

export default app;