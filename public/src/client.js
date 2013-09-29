var socket = io.connect(window.location.href),
    Game = require('../../src/Game');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var w;
var game = new Game();

var updateCanvasSize = function() {
    w = { x: window.innerWidth, y: window.innerHeight };
    canvas.width = w.x;
    canvas.height = w.y;
};

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

var draw = function() {
    context.clearRect(0, 0, w.x, w.y);

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(game.ball.position.x * w.x, game.ball.position.y * w.y, 10, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

var loop = function() {
    game.update();
    draw();
    requestAnimationFrame(loop);
}

loop();

socket.on('connect', function (data) {
    console.log('Connected to socket');
});

socket.on('ball:update', function(ball) {
    for(var i in ball) {
        game.ball[i] = ball[i];
    }
});
