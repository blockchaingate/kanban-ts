import { rpc } from '../../services';
import { Request, Response } from 'express';

export class Controller {
    runCommand(req: Request, res: Response): void {
        const args: string[] = !!req.body.args ? req.body.args : [];
        rpc.run(req.body.method, {}, ...args)
            .then(data => res.json({status: 'success', result: data}))
            .catch(err => {
                console.log(err);
                res.status(500);
                res.json({
                    status: 'error',
                    reason: err
                });
            });
    }
}

export default new Controller();
