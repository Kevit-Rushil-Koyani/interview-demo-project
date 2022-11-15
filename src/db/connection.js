/***********************************
 * 3rd Party Libraries
 * *********************************/
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

/***********************************
 * Helper & Services
 * *********************************/


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
    poolSize: 5,
    reconnectTries: Number.MAX_SAFE_INTEGER,
    reconnectInterval: 500,
    useFindAndModify: false
  };
  mongoose.connect(dbURL, dbOptions).catch((err) => {
    Logger.log.fatal('DATABASE - Error:' + err);
  });
};

connectDb();
