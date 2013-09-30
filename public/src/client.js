var socket = io.connect(window.location.href),
    Game = require('../../src/Game');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var w;
var game = new Game();
var animationRequest;

var updateCanvasSize = function() {
    w = { x: window.innerWidth, y: window.innerHeight };
    canvas.width = w.x;
    canvas.height = w.y;
};

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

var draw = function() {
    context.clearRect(0, 0, w.x, w.y);

    var size = Math.min(10, Math.max(2, (w.x * w.y) / 100000));
    var x = game.ball.position.x * w.x - (size * (game.ball.position.x * 2 - 1));
    var y = game.ball.position.y * w.y - (size * (game.ball.position.y * 2 - 1));
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

var loop = function() {
    game.update();
    draw();
    animationRequest = requestAnimationFrame(loop);
}

socket.on('connect', function (data) {
    console.log('Connected to socket');
});

socket.on('ball:update', function(ball) {
    for(var i in ball) {
        game.ball[i] = ball[i];
    }
});

socket.on('game:start', function() {
    console.log('Starting game');
    game = new Game();
    loop();
});

socket.on('opponent:left', function() {
    console.log('Opponent left');
    context.clearRect(0, 0, w.x, w.y);
    cancelAnimationFrame(animationRequest);
});

socket.on('matchmaking', function() {
    console.log('Waiting for opponent');
});
