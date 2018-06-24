const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
server.listen(3001);

const io = require('socket.io')(server);

// 키보드 입력
const is = process.stdin;

// System Namespace
var system = io.of('/system');
system.on('connection', (socket) => {
   console.log('emergency namespace connected');

   is.on('data', (chunk) => {
      console.log('emergency namespace!');
      socket.emit('message', { msg: chunk.toString() });
   });
});

io.on('connection', socket => {
    // 연결된 사용자와 채팅방 정보
    var user;
    var room;

    // 채팅방 입장
    socket.on('joinRoom', function (info) {
        user = info.user;
        // 기존 룸에서 나가기
        if ( room ) {
            socket.leave(room);
            console.log('user ', user, 'leave room:', room);
            io.to(room).emit('leaveRoomResult', {user:user, room:room})
            room = null;
        }

        // 채팅방 얻어오기
        room = info.room;
        socket.join(room);
        
        console.log('user ', user, 'join room:', room);
        io.to(room).emit('joinRoomResult', {user:user, room:room})
    });

    // 클라이언트가 보낸 메세지 이벤트
    socket.on('message', function(data) {
        console.log('client message :', data);

        const text = data.message;

        console.log('[' + room + ']', user, '>>', text);
        if ( user && text ) {
            io.to(room).emit('messageReceive', {user:user, message:text})
        }
    });
});