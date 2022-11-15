/***********************************
 * Module dependencies
 * *********************************/
const express = require('express');
const router = express.Router();

/***********************************
 * Services
 * *********************************/
const Logger = require('../services/logger');
const { listUsers, addUser } = require('../helper/user.helper');

/***********************************
 * Router Definitions
 * *********************************/
/**
 * API to fetch user list from database
 */
router.get('/', async (req, res) => {
    try {
        const userDocuments = await listUsers({
            page: req.query.page,
            limit: req.query.limit,
            sortBy: req.query.sortBy,
            sortType: req.query.sortType,
        });
        return res.status(200).send({ message: 'Users fetched successfully', data: userDocuments });
    } catch (err) {
        Logger.log.error('Error occurred while getting users:', err);
        res.status(500).send({
            message: err.message,
        });
    }
});

/**
 * API to Add user data into the database
 */
router.post('/', async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            password: req.body.password,
        };
        const userId = await addUser(user);
        return res.status(201).send({ message: 'User added successfully', data: { userId: userId } });
    } catch (err) {
        if (err.code === 'USER_EXISTS')
            return res.status(400).send({
                message: err.message,
            });
        Logger.log.error('Error occurred while adding users:', err);
        res.status(500).send({
            message: err.message,
        });
    }
});

/***********************************
 * Export Router
 * *********************************/
module.exports = router;
