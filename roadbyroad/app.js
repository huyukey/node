const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/favicon.ico', (req, res) => {res.send('')});
app.use('/resources', express.static(__dirname + '/resources'));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const roadRouter = require('./router/road_router');
app.use(roadRouter);

module.exports = app;