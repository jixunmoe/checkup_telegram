import express from 'express';
import bodyParser from 'body-parser';
import {handleSlackRoute} from "./controllers/slack.mjs";
import {handleBatchReport} from "./controllers/batch.mjs";

export async function startExpress(appRoot) {
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        req.appRoot = appRoot;
        next();
    });
    app.post('/slack', handleSlackRoute);
    app.post('/batch', handleBatchReport);
    app.listen(process.env.PORT || appRoot.config.port);
    return app;
}