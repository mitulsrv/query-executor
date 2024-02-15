const express = require('express');

const router = express.Router();

const executorRoute = require('./executor');

router.use('/executor', executorRoute);

module.exports = router;