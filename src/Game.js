var EventEmitter = require('events').EventEmitter,
    Ball = require('./Ball');



function Game() {
    this.gameSpeed = 1;
    this.prevTime = new Date();
    this.ball = new Ball(0.5, 0.5, 0.01, 0.02);
}

Game.prototype = Object.create(EventEmitter.prototype);

Game.prototype.update = function() {
    var t = (this.prevTime - new Date()) * (this.gameSpeed / 100);
    this.prevTime = new Date();

    this.ball.update(t);
}

module.exports = Game;
