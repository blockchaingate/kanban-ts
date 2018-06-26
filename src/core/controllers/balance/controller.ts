import { RPCService } from '../../services';
import { Request, Response } from 'express';

export class Controller {
    all(req: Request, res: Response): void {
        res.status(200);
        res.json({status: 'worked'});
    }

    byId(req: Request, res: Response): void {

    }

    create(req: Request, res: Response): void {

    }

    update(req: Request, res: Response): void {

    }
}

export default new Controller();
