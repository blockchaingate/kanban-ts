import { ClientRequest } from 'http';
import * as http from 'http';
import * as https from 'https';
import { RpcRequestOptions } from '../interfaces';
import { l } from '../../common/logger';


export class FabRpcClient {
    private client: any;

    constructor(
        private opts: any = {}
    ) {
        this.client = this.opts.ssl ? https : http;
    }

    call(method: any, params: any, path?: string): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            const time: number = Date.now();
            let requestJSON: any;

            if (Array.isArray(method)) {
                // multiple rpc batch call
                requestJSON = [];
                method.forEach((batchCall, i) => {
                    requestJSON.push({
                        id: time + '-' + i,
                        method: batchCall.method,
                        params: batchCall.params
                    });
                });
            } else {
                // single rpc call
                requestJSON = {
                    id: time,
                    method: method,
                    params: params
                };
            }

            // First we encode the request into JSON
            requestJSON = JSON.stringify(requestJSON);

            // prepare request options
            const requestOptions: RpcRequestOptions = {
                host: this.opts.host || 'localhost',
                port: this.opts.port || 8667,
                method: 'POST',
                path: path || '/',
                headers: {
                    'Host': this.opts.host || 'localhost',
                    'Content-Length': requestJSON.length
                },
                agent: false,
                rejectUnauthorized: this.opts.ssl && this.opts.sslStrict !== false
            };
            l.debug(requestOptions);

            if (this.opts.ssl && this.opts.sslCa) {
                requestOptions.ca = this.opts.sslCa;
            }

            // use HTTP auth if user and password set
            if (this.opts.user && this.opts.pass) {
                requestOptions.auth = this.opts.user + ':' + this.opts.pass;
            }

            // Now we'll make a request to the server
            let cbCalled: boolean = false;
            const request: ClientRequest = this.client.request(requestOptions);

            // start request timeout timer
            const reqTimeout: number = setTimeout(() => {
                if (cbCalled) {
                    return;
                }
                cbCalled = true;
                request.abort();
                const err: Error = new Error('ETIMEDOUT');
                l.error(err);
                reject(err);
            }, this.opts.timeout || 30000);

            // set additional timeout on socket in case of remote freeze after sending headers
            request.setTimeout(this.opts.timeout || 30000, () => {
                if (cbCalled) {
                    return;
                }
                cbCalled = true;
                request.abort();
                const err: Error = new Error('ESOCKETTIMEDOUT');
                l.error(err);
                reject(err);
            });

            request.on('error', (err) => {
                l.error(err);
                if (cbCalled) {
                    return;
                }
                cbCalled = true;
                clearTimeout(reqTimeout);
                reject(err);
            });

            request.on('response', (response) => {
                clearTimeout(reqTimeout);

                // We need to buffer the response chunks in a nonblocking way.
                let buffer: string = '';
                response.on('data', chunk => {
                    buffer += chunk;
                });
                // When all the responses are finished, we decode the JSON and
                // depending on whether it's got a result or an error, we call
                // emitSuccess or emitError on the promise.
                response.on('end', () => {
                    let err: Error;

                    if (cbCalled) {
                        return;
                    }
                    cbCalled = true;

                    try {
                        let decoded: any = JSON.parse(buffer);
                        if (!Array.isArray(decoded)) {
                            decoded = [decoded];
                        }

                        // iterate over each response, normally there will be just one
                        // unless a batch rpc call response is being processed
                        decoded.forEach((decodedResponse) => {
                            if (decodedResponse.hasOwnProperty('error') && decodedResponse.error != null) {
                                err = new Error(decodedResponse.error.message || '');
                                if (!!decodedResponse.error.message) {
                                    err.message = decodedResponse.error.message;
                                }
                                reject(err);
                            } else if (decodedResponse.hasOwnProperty('result')) {
                                resolve(decodedResponse.result);
                            } else {
                                err = new Error(decodedResponse.error.message || '');
                                if (!!decodedResponse.error.message) {
                                    err.message = decodedResponse.error.message;
                                }
                                reject(err);
                            }
                        });
                    } catch (e) {
                        if (response.statusCode !== 200) {
                            err = new Error('Invalid params, response status code: ' + response.statusCode);
                            l.error(err);
                            reject(err);
                        } else {
                            err = new Error('Problem parsing JSON response from server');
                            l.error(err);
                            reject(err);
                        }
                        return;
                    }
                });
            });
            request.end(requestJSON);
        }));
    }
}
