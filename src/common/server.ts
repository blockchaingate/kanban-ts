import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import { BackgroundProcessService } from '../core/services';
import { logger } from '../middleware';
import swaggerify from './swagger';
import { l } from './logger';

const app: Application = express();

export default class KanbanServer {
    private backgroundService: BackgroundProcessService;

    constructor() {
        this.backgroundService = new BackgroundProcessService();
        const root: any = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(logger);
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));
    }

    private gracefulExit = () => {
        this.backgroundService.exit();
        l.info('Exiting Kanban...');
        process.exit(0);
    }

    router(routes: (app: Application) => void): KanbanServer {
        swaggerify(app, routes);
        return this;
    }

    listen(port: number = parseInt(process.env.PORT)): Application {
        if (this.backgroundService.init()) {
            l.info(`up and running in ${process.env.NODE_ENV || 'development'}: ${os.hostname()} on port: ${port}}`);
        }

        process.on('SIGTERM', this.gracefulExit);
        process.on('SIGINT', this.gracefulExit);

        http.createServer(app).listen(port);
        return app;
    }
}
