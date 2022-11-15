/***********************************
 * 3rd Party Libraries
 * *********************************/
const express = require('express');
const router = express.Router();

/***********************************
 * Router Definitions
 * *********************************/
router.get('/', function (req, res, next) {
    res.send('Hello, World!');
});

/***********************************
 * Exports
 * *********************************/
module.exports = router;
