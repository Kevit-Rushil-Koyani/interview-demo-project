/***********************************
 * 3rd Party Libraries
 * *********************************/
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

/***********************************
 * Helper & Services
 * *********************************/
const { mongoDBConnectionUrl } = require('../../config');
const Logger = require('../services/logger')

//add all Models
let models = path.join(__dirname, '..', 'models');
fs.readdirSync(models).forEach((file) => require(path.join(models, file)));

/***********************************
 * Mongoose Configurations
 * *********************************/
mongoose.connection.on('connected', () => {
    Logger.log.info('DATABASE - Connected');
});

mongoose.connection.on('error', (err) => {
    Logger.log.error('DATABASE - Error');
    Logger.log.error(err.message || err);
});

mongoose.connection.on('disconnected', () => {
    Logger.log.warn('DATABASE - disconnected  Retrying....');
});

let connectDb = function () {
    const dbOptions = {
        maxPoolSize: 5,
        serverSelectionTimeoutMS:5000
    };
    mongoose.connect(mongoDBConnectionUrl, dbOptions).catch((err) => {
        Logger.log.fatal('DATABASE - Error:' + err);
    });
};

connectDb();
