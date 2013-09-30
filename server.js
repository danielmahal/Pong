var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    Game = require('./src/Game'),
    crypto = require('crypto');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server, {
    log: false
});

server.listen(8000);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {
    matchmake(socket);
});

var matchmake = function(socket) {
    var lobby = io.sockets.clients('lobby');

    if(lobby.length) {
        createGame([socket, lobby[0]]);
    } else {
        socket.join('lobby');
        socket.emit('matchmaking');
    }
}

var createGame = function(sockets) {
    var id = crypto.randomBytes(20).toString('hex');

    var game = new Game();

    var interval = setInterval(function() {
        game.update();
    }, 1000 / 60);

    game.ball.on('update', function() {
        io.sockets.in(id).emit('ball:update', game.ball);
    });

    sockets.forEach(function(socket) {
        socket.leave('lobby');
        socket.join(id);

        socket.on('disconnect', function() {
            clearInterval(interval);

            io.sockets.clients(id).forEach(function(s, i) {
                if(s == socket) return;

                s.emit('opponent:left');
                s.leave(id);
                matchmake(s);
            });
        });
    });

    io.sockets.in(id).emit('game:start');
}
