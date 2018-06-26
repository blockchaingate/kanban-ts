import { rpc } from '../../services';
import { Request, Response } from 'express';

export class Controller {
    getPeerInfo(req: Request, res: Response): void {
        rpc.run('getpeerinfo')
            .then(data => {
                res.status(200);
                res.json({status: 'success', result: data});
            })
            .catch(err => {
                res.json({
                    status: 'error',
                    reason: err
                });
            });
    }
}

export default new Controller();
