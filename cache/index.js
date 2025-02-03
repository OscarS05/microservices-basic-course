const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

//Routes
app.use('/', router);

app.listen(config.cacheService.port, () => {
    console.log('Redis cache service listening in port: ', config.cacheService.port);
});

// module.exports = app;