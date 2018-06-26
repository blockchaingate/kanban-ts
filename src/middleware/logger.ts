import { NextFunction, Request, Response } from 'express';
import { l } from '../common/logger';

const logger: any = (req: Request, res: Response, next: NextFunction) => {
    l.info(`[${req.method}] [${req.path}] [${res.statusCode}] [${req.ip}] [${new Date().toISOString()}]`);
    next(); // Passing the request to the next handler in the stack.
};

export { logger };
