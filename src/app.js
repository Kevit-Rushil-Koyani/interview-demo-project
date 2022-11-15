/***********************************
 * 3rd Party Libraries
 * *********************************/
const express = require('express');
const cors = require('cors');
const http = require('http');
let bodyParser = require('body-parser');

/***********************************
 * Helper & Services
 * ****************** **************/
require('dotenv').config();
const Logger = require('./services/logger');

/***********************************
 * Database Connection
 * *********************************/
require('./db/connection');

/***********************************
 * Express configuration
 * *********************************/
let app = express();
app.use(bodyParser.json());

const index = require('./routes/index');
const user = require('./routes/user.route');

app.use('/', index);
app.use('/users', user);

//CORS
app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: [
            'Origin',
            ' X-Requested-With',
            ' Content-Type',
            ' Accept ',
            ' Authorization',
            'transcript-token',
            'contract-bot-token',
            'bot-token',
            'x-access-token',
        ],
        credentials: true,
    }),
);

/***********************************
 * Get port from environment and store in Express
 * *********************************/
const port = process.env.PORT || '3000';
app.set('port', port);

/***********************************
 * Create HTTP server.
 * *********************************/
const server = http.createServer(app);

/***********************************
 * Listen on provided port, on all network interfaces.
 * *********************************/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/***********************************
 * Event listener for HTTP server "error" event.
 * *********************************/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/***********************************
 * Event listener for HTTP server "listening" event.
 * *********************************/
function onListening() {
    const addr = server.address();
    const port = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    Logger.log.info('Listening on ' + port);
}
