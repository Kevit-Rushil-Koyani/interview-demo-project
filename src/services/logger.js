/**
 * Services Structure
 */

/**
 * System and 3rd party libs
 */
const log4js = require('log4js');
const morgan = require('morgan');
const config = require('./../../config');

/**
 * Declarations & Implementations
 */
const configuration = {
    appenders: {
        out: { type: 'stdout' },
        allLogs: {
            type: 'file',
            filename: 'all.log',
            maxLogSize: 10485760,
            backups: 10,
            compress: true,
        },
        outFilter: {
            type: 'logLevelFilter',
            appender: 'out',
            level: config.logLevel,
        },
    },
    categories: {
        default: { appenders: ['allLogs', 'outFilter'], level: 'all' },
    },
};

log4js.configure(configuration);

const log = log4js.getLogger();
log.level = process.env.LOG_LEVEL || 'all';
const morganInstance = morgan('dev', {
    stream: {
        write: (str) => {
            log.debug(str);
        },
    },
});

/**
 * Service Export
 */
module.exports = {
    log,
    morgan: morganInstance,
};
