import {promises as fs} from "fs";
import {startBot} from "./bot.mjs";
import {startExpress} from "./web.mjs";

export class App {
    static async readConfig() {
        const configJson = await fs.readFile('config.json', 'utf-8');
        return JSON.parse(configJson);
    }

    async main() {
        this.config = await App.readConfig();
        this.bot = await startBot(this);
        this.web = await startExpress(this);
    }
}

const app = new App();

export default app;