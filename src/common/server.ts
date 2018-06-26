import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import { logger } from '../middleware';
import swaggerify from './swagger';
import { l } from './logger';

const app: Application = express();

export default class ExpressServer {
    constructor() {
        const root: any = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(logger);
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));
    }

    router(routes: (app: Application) => void): ExpressServer {
        swaggerify(app, routes);
        return this;
    }

    listen(port: number = parseInt(process.env.PORT)): Application {
        const welcome: any = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'}: ${os.hostname() } on port: ${port}}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}
