import * as pino from 'pino';

const l: pino.Logger = pino({
    name: process.env.APP_ID,
    level: !!process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug',
    prettyPrint: true
});

export { l };
