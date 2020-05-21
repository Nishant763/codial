const express = require('express');
const Router = express.Router();

const UsersController = require('../controllers/users_controller');

Router.get('/users',UsersController.users);
Router.get('/login',UsersController.login);


module.exports = Router;