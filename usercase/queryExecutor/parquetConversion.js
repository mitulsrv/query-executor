const path = require('path');
const { ParquetWriter } = require('parquetjs');

const parquetConversion = ({ query, tenantId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const writer = await ParquetWriter.openFile({}, path.join(__dirname, `../../public/${tenantId}.parquet`), { rowGroupSize: 10000 })
            let index = 1;
            query.on('row', async (row, result) => {
                if (index === 1) {
                    const keys = Object.keys(row);
                    keys.forEach(key => {
                        if (!writer.schema[key]) {
                            writer.schema[key] = { type: 'UTF8' };
                        }
                        if(row[key] === null || row[key] === undefined){
                            row[key] = '';
                        }
                        if(row[key] !== typeof string){
                            row[key] = String(row[key]);
                        }
                    })
                }
                await writer.appendRow(row);
                index += 1;
            });
            query.on('end', async (result) => {
                await writer.close();
            });
            query.on('error', (error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = parquetConversion;