var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    Game = require('./src/Game');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

server.listen(8000);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    var game = new Game();

    game.ball.on('update', function() {
        socket.emit('ball:update', game.ball);
    });

    socket.emit('game:start', game);

    var interval = setInterval(function() {
        game.update();
    }, 1000 / 60);

    socket.on('disconnect', function() {
        clearInterval(interval);
        console.log('Client disconnected');
    })
});
