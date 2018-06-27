import './common/env';
import { BackgroundProcessService } from './core/services/background-process.service';
import Server from './common/server';
import routes from './routes';

const port: number = parseInt(process.env.PORT);
const backgroundService: BackgroundProcessService = new BackgroundProcessService();

function gracefulExit() {
    backgroundService.exit();
    process.exit(0);
}

backgroundService.init();

process.on('SIGTERM', gracefulExit);
process.on('SIGINT', gracefulExit);

export default new Server()
    .router(routes)
    .listen(port);
