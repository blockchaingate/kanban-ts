import { NextFunction, Request, Response } from 'express';
import { l } from '../common/logger';

const logger: any = (req: Request, res: Response, next: NextFunction) => {
    const start: number = Date.now();
    const requestedURL: string = req.url;
    res.on('finish', () => {
        const duration: number = Date.now() - start;
        l.info(`[${req.method}] [${requestedURL}] [${res.statusCode}] [${req.ip}] [${duration}ms]`);
    });
    next(); // Passing the request to the next handler in the stack.
};

export { logger };
