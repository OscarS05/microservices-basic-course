const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());

//Routes
app.use('/api/post', post);

app.use(errors);


app.listen(config.post.port, () => {
    console.log(`Post service running in the port ${config.post.port}`);
});

module.exports = app;