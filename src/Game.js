var EventEmitter = require('events').EventEmitter,
    Ball = require('./Ball');

function Game() {
    this.ball = new Ball(0.5, 0.5, 0.02, 0.01);
}

Game.prototype = Object.create(EventEmitter.prototype);

Game.prototype.update = function() {
    this.ball.update();
}

module.exports = Game;
