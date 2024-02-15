const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')

app.use(bodyParser());
app.use(routes);

app.listen(3001, () => {
    console.log(`query-executor server is running on port 3001`)
})