import { Router } from 'express';
import * as express from 'express';
import controller from './controller';

const balanceRouter: Router = express.Router()
    .post('', controller.create)
    .get('', controller.all)
    .put('/:account', controller.update)
    .get('/:account', controller.byId);

export { balanceRouter };
