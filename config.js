module.exports = {
    port: process.env.PORT || 3200,
    logLevel: process.env.LOG_LEVEL || 'all',
    mongoDBConnectionUrl: process.env.DB_URL,
};
