import { ChildProcess } from 'child_process';
import { Subject } from 'rxjs';
import { l } from '../../common/logger';
import * as childProcess from 'child_process';


export class FabCliRunner {
    private cli: string = process.env.FABCOIN_CLI_EXECUTABLE;
    private credential: string = process.env.FAB_CREDENTIAL;
    private streamOutput: Subject<string> = new Subject<string>();

    constructor() {
        // needs credential and path
    }

    execute(timeout: number, ...args: string[]): void {
        const child: ChildProcess = childProcess.spawn(this.cli, args);

        child.stdout.on('data', (data: Buffer) => {
            const output: string = data.toString();
            l.debug(output);
            this.streamOutput.next(output);
        });
        child.stderr.on('data', (data: Buffer) => {
            l.error(data.toString());
        });
        child.on('exit', (code: Buffer) => {
            l.info(`RPC call existed with code: ${code}`);
            const statusCode: number = Number(code);
            if (statusCode !== 0) {
                this.streamOutput.error(statusCode);
            }
            this.streamOutput.complete();
        });
    }

    get output() {
        return this.streamOutput.asObservable();
    }
}