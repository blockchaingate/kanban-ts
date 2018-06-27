import { rpc } from '../../services';
import { Request, Response } from 'express';

export class Controller {
    getPeerInfo(req: Request, res: Response): void {
        rpc.run('getpeerinfo')
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
