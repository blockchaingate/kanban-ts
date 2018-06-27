export interface RpcRequestOptions {
    user?: string;
    pass?: string;
    host?: string;
    port?: number;
    path?: string;
    method?: string;
    headers?: any;
    agent?: boolean;
    rejectUnauthorized?: boolean;
    ca?: any;
    auth?: any;
}
