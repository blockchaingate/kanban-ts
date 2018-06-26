import { Router } from 'express';
import * as express from 'express';
import controller from './controller';

const peerInfoRouter: Router = express.Router()
    .get('', controller.getPeerInfo);

export { peerInfoRouter };
