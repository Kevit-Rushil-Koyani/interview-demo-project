/***********************************
 * Module dependencies
 * *********************************/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const User = mongoose.model('user');

/***********************************
 * Services
 * *********************************/
const Logger = require('../services/logger');

/***********************************
 * Configurations
 * *********************************/
const initializePassport = require('../passport-config');
const config = require('../../config');

/***********************************
 * Global declarations
 * *********************************/
let users = [];

/***********************************
 * Router Definitions
 * *********************************/
router.use(flash());
router.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
    }),
);
router.use(passport.initialize());
router.use(passport.session());

/**
 * Function to fetch users from database + Initializing passport
 */
async function addUsers() {
    users = await User.find().select('id name email password').lean();
    initializePassport(
        passport,
        (email) => users.find((user) => user.email === email),
        (id) => users.find((user) => user._id === id),
    );
}

/**
 * Calling this function to store user's details to global session from database
 */
addUsers();

/**
 * API to Login User
 */
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {}), async (req, res) => {
    try {
        res.status(200).send({ message: 'User logged in successfully' });
    } catch (err) {
        console.log(err);
    }
});

/**
 * Middleware to authenticate user
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {*} next - application's request-response cycle
 * @returns
 */
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

/***********************************
 * Export Router
 * *********************************/
module.exports = router;
