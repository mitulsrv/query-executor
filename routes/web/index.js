const express = require('express');

const router = express.Router();

const executorRoute = require('./executor');

router.use('/v1', executorRoute);

module.exports = router;