import { ChildProcess } from 'child_process';
import { l } from '../../common/logger';
import * as childProcess from 'child_process';


export class BackgroundProcessService {
    private fabcoind: string = process.env.FABCOIND_EXECUTABLE;
    private fabcoindProcess: ChildProcess;
    private net: string = process.env.FAB_NET;
    private mainProcessPID: number = process.ppid;
    private netCommands: any = {
        MainNet: '--mainnet',
        TestNet: '--testnet',
        TestNetNoDNS: '--testnetnodns'
    };

    init(): boolean {
        l.info(`Starting Fabcoind process with ${this.net}...`);
        this.fabcoindProcess = childProcess.spawn(this.fabcoind, [this.netCommands[this.net]]);
        this.fabcoindProcess.stdout.on('data', (data: Buffer) => {
            l.debug(data.toString());
        });
        this.fabcoindProcess.stderr.on('data', (data: Buffer) => {
            l.error(data.toString());
        });
        this.fabcoindProcess.on('error', (data: Buffer) => {
            l.error('Fabcoind process failure, please check the logs and your config');
            process.kill(this.mainProcessPID);
        });
        this.fabcoindProcess.on('exit', (code: Buffer) => {
            l.info(`Fabcoind existed with code: ${code}`);
        });

        return !!this.fabcoindProcess.pid;
    }

    exit() {
        if (!!this.fabcoindProcess.pid) {
            l.info('Killing Fabcoind process...');
            this.fabcoindProcess.kill();
        }
    }
}
