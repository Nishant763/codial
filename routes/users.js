const express = require('express');
const Router = express.Router();

const UsersController = require('../controllers/users_controller');

Router.get('/users',UsersController.users);


module.exports = Router;