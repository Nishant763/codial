const express = require('express');

const router = express.Router();
const posts_api = require('../../../controllers/api/v1/posts_controller_api');

router.get('/index',posts_api.index);

router.delete('/:id',posts_api.destroy);

module.exports = router;