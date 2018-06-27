import { ChildProcess } from 'child_process';
import { l } from '../../common/logger';
import * as childProcess from 'child_process';


export class BackgroundProcessService {
    private fabcoind: string = process.env.FABCOIND_EXECUTABLE;
    private fabcoindProcess: ChildProcess;

    init() {
        l.info('Starting Fabcoind process...');
        this.fabcoindProcess = childProcess.spawn(this.fabcoind);
        this.fabcoindProcess.stdout.on('data', (data: Buffer) => {
            l.debug(data.toString());
        });
        this.fabcoindProcess.stderr.on('data', (data: Buffer) => {
            l.error(data.toString());
        });
        this.fabcoindProcess.on('exit', (code: Buffer) => {
            l.info(`Fabcoind existed with code: ${code}`);
        });
    }

    exit() {
        l.info('Killing Fabcoind process...');
        this.fabcoindProcess.kill();
    }
}
