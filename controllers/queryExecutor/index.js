const executorUseCase = require('../../usercase/queryExecutor/executor');

const executor = require('./executor');

module.exports = {
    queryExecutor: executor.queryExecutor({ executorUseCase })
}