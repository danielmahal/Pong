var EventEmitter = require('events').EventEmitter;

var Ball = function(x, y, velX, velY) {
    this.position = {
        x: x || 0.5,
        y: y || 0.5
    };

    this.velocity = {
        x: velX || 0,
        y: velY || 0
    };
};

Ball.prototype = Object.create(EventEmitter.prototype);

Ball.prototype.update = function(t) {
    ['x', 'y'].forEach(function(x) {
        this.position[x] += this.velocity[x] * t;

        if(this.position[x] <= 0 || this.position[x] >= 1) {
            this.velocity[x] *= -1;
            this.emit('update');
        }
    }.bind(this));
}

module.exports = Ball;
