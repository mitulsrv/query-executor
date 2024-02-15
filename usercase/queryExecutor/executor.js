const pg = require('pg');
const { Client } = require('pg');
const parquetConversion = require('./parquetConversion');
const executorValidation = require('../validation/executorValidation');


const executor = async (params) => {
    try {
        const schema =  executorValidation.validate(params);
        if (schema.error) {
            return {
                code: 400,
                message: schema.error.message,
                status: false
            }
        }
        const client = new Client({
            user: params?.databaseConnectionDetail?.username,
            host: params?.databaseConnectionDetail?.host,
            database: params?.databaseConnectionDetail?.database,
            password: params?.databaseConnectionDetail?.password,
            port: params?.databaseConnectionDetail?.port,
            max: 10,
            idleTimeoutMillis: 30000
        });
        client.connect();
        const query = client.query(new pg.Query(params?.query));
        const conversionResponse = await parquetConversion({ query, tenantId: params?.tenantId })
        console.log("conversion response =>", conversionResponse);
        return {
            code: 200,
            message: "Query executed successfully.",
            status: false
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = executor;