const Joi = require('joi');

const schema = Joi.object({
    query: Joi.string().required(),
    databaseConnectionDetail: Joi.object({
        host: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        database: Joi.string().required(),
        port: Joi.string().required()
    }),
    tenantId: Joi.string().required()
})

module.exports = schema;