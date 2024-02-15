const express = require('express');

const router = express.Router();

const queryExecutorController = require('../../../controllers/queryExecutor')

router.post('/execute', queryExecutorController.queryExecutor);

module.exports = router;