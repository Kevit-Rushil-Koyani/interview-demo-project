/***********************************
 * Module dependencies
 * *********************************/
const mongoose = require('mongoose');
const User = mongoose.model('user');

/***********************************
 * Services
 * *********************************/
const Logger = require('../services/logger');

/**
 * Helper function to check for existing user
 * @param {string} email - user's email
 * @returns boolean
 */
const checkForExistingUser = async (email) => {
    try {
        const user = await User.findOne({
            email: email.toLowerCase(),
        }).lean();
        return !!user;
    } catch (e) {
        Logger.log.error('Error occurred while checking for existing user:', e);
        return Promise.reject(e);
    }
};

/**
 * Helper function to fetch user list
 * @param {number} page - page number
 * @param {number} limit - limit number
 * @param {object} sortBy - sort by field name
 * @param {object} sortType - sorting direction
 * @returns {object}
 */
const listUsers = async ({ page = 1, limit = 15, sortBy = 'name', sortType = 1 }) => {
    try {
        page = parseInt(page);
        limit = parseInt(limit);
        const sort = {};
        sort[sortBy] = parseInt(sortType);
        const pipeline = [
            { $sort: sort },
            { $project: { _id: 1, name: 1, email: 1, course: 1 } },
            {
                $facet: {
                    docs: [
                        {
                            $skip: (page - 1) * limit,
                        },
                        { $limit: limit },
                    ],
                    total: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            },
        ];
        const users = await User.aggregate(pipeline).allowDiskUse(true);
        const total = users?.[0]?.['total']?.[0]?.['count'] || 0;
        return {
            docs: users?.[0]?.['docs'] || [],
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    } catch (e) {
        Logger.log.error('Error occurred while getting users:', e);
        return Promise.reject(e);
    }
};

/**
 * It takes in a userData object, creates a new User model, saves it to the database, and returns the
 * user's ID
 * @param {object} userData - The data that you want to insert into the database.
 * @returns The user's id.
 */
const insertUser = async function (userData) {
    try {
        const user = new User(userData);
        await user.save();

        return user._id;
    } catch (e) {
        Logger.log.error('Error occurred while adding users:', e);
        return Promise.reject(e);
    }
};

/**
 * It checks if a user exists, and if not, it inserts the user
 * @param {object} user - The user object that you want to add to the database.
 * @returns A promise that resolves to the user object if the user is added successfully.
 */
const addUser = async function (user) {
    try {
        const isUserExist = await checkForExistingUser(user.email);
        if (isUserExist) {
            return Promise.reject({ message: 'User already exists', code: 'USER_EXISTS' });
        }
        return insertUser(user);
    } catch (e) {
        Logger.log.error('Error occurred while adding users:', e);
        return Promise.reject(e);
    }
};

/***********************************
 * Service Export
 * *********************************/
module.exports = {
    checkForExistingUser,
    listUsers,
    addUser,
};
