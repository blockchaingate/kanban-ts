import { Application } from 'express';
import { balanceRouter, networkRouter, peerInfoRouter, rpcRouter } from './core/controllers';

export default function routes(app: Application): void {
    app.use('/api/v1/balance', balanceRouter);
    app.use('/api/v1/network', networkRouter);
    app.use('/api/v1/peer-info', peerInfoRouter);
    app.use('/api/v1/rpc', rpcRouter);
}
