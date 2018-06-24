const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const roadRouter = require('./router/road_router');
app.use(roadRouter);

module.exports = app;