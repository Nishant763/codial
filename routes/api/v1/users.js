const express = require('express');

const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_controller_api');

router.post('/create-session',usersApi.create_session);


module.exports = router;