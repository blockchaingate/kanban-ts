import { Router } from 'express';
import * as express from 'express';
import controller from './controller';

const rpcRouter: Router = express.Router()
    .post('', controller.runCommand);

export { rpcRouter };
