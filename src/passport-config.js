/**
 * Module dependencies
 */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

/**
 * Services
 */
const Logger = require('./services/logger');

/**
 * Helper function to initialize the strategy
 * @param {*} passport - passport auth object
 * @param {*} getUserByEmail - get user by email
 * @param {*} getUserById - get user by id
 */
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            Logger.log.error('No user found with that email' + email);
            return done(null, false, { message: 'No user with that email' });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            Logger.log.error('Error occurred while authenticating user', e);
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        return done(null, id);
    });
}

/**
 * Service Export
 */
module.exports = initialize;
