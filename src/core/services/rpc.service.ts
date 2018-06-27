import { RpcRequestOptions } from '../interfaces';
import { AsyncBlockingQueue } from '../common/queue';
import { FabRpcClient } from '../common/fab-rpc-client';
import { l } from '../../common/logger';

export class RPCService {
    private childPool: AsyncBlockingQueue<FabRpcClient> = new AsyncBlockingQueue<FabRpcClient>(10);

    constructor() {
        // for (let i: number = 0; i < 10; ++i) {
        //     this.childPool.put(new FabRpcClient());
        // }
    }

    private async getWorker(): Promise<FabRpcClient> {
        return await this.childPool.get();
    }

    private returnWorker(worker: FabRpcClient) {
        this.childPool.put(worker);
    }

    async run(method: string, opts: RpcRequestOptions = {}, ...args: string[]) {
        //TODO: add worker pool
        l.debug(`Running RPC command ${method}...`);
        const worker: FabRpcClient = new FabRpcClient({user: process.env.FAB_USER, pass: process.env.FAB_PASSWORD, opts});
        return await worker.call(method, args);
    }
}

const rpc: RPCService = new RPCService();
export { rpc };
