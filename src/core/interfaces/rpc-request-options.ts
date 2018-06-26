export interface RpcRequestOptions {
    host: string;
    port: number;
    path: string;
    method: string;
    headers: any;
    agent: boolean;
    rejectUnauthorized: boolean;
    ca?: any;
    auth?: any;
}
