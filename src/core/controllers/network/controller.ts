import { rpc } from '../../services';
import { Request, Response } from 'express';

export class Controller {
    getNetwork(req: Request, res: Response): void {
        rpc.run('getnetworkinfo')
            .then(data => res.json({status: 'success', result: data}))
            .catch(err => {
                res.status(500);
                res.json({
                    status: 'error',
                    reason: err
                });
            });
    }
}

export default new Controller();
