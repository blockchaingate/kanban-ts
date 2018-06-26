import { ChildProcess } from 'child_process';
import { Subject } from 'rxjs';
import { l } from '../../common/logger';
import * as childProcess from 'child_process';


export class BackgroundProcessService {
    private fabcoind: string = process.env.FABCOIND_EXECUTABLE;
    private fabcoindProcess: ChildProcess;

    init() {
        l.info('Starting Fabcoind process...');
        this.fabcoindProcess = childProcess.spawn(this.fabcoind);
    }

    exit() {
        this.fabcoindProcess.kill();
    }
}
