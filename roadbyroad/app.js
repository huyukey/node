const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var server = http.createServer(app);

app.get('/favicon.ico', (req, res) => {res.send('')});
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

var io = require('socket.io')(server);
io.on('connection', (socket) => {
   console.log('클라이언트 접속');

   // 원격 호스트 접속 종료 이벤트
   socket.on('disconnect', () => {
      console.log('Disconnected');
   });
});

const roadRouter = require('./router/road_router');
app.use('/resources', express.static(__dirname + '/resources'));
app.use(roadRouter);

module.exports = app;