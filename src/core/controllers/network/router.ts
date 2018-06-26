import { Router } from 'express';
import * as express from 'express';
import controller from './controller';

const networkRouter: Router = express.Router()
    .get('', controller.getNetwork);

export { networkRouter };
