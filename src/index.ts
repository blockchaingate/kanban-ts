import './common/env';
import { BackgroundProcessService } from './core/services/background-process.service';
import Server from './common/server';
import routes from './routes';

const port: number = parseInt(process.env.PORT);
// new BackgroundProcessService().init();

export default new Server()
  .router(routes)
  .listen(port);
