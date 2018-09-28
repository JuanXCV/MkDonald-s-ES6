function Player(canvas,y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 80;
  self.x = 0;
  self.y = y - self.size;
  self.vel = 5;
  self.direction = 0;
  self.lives = 1;
}
Player.prototype.update = function() {
  var self = this;
  self.x += (self.vel * self.direction);
  self._checkLimits();
}
Player.prototype.render = function() {
  var self = this;
  self.ctx.fillStyle = "blue";
  self.ctx.fillRect(self.x, self.y, self.size, self.size - 60);
};
Player.prototype.setDirection = function(direction) {
  var self = this;
  self.direction = direction
};
Player.prototype._checkLimits = function() {
  var self = this;
  if (self.x < 0) {
    self.setDirection(1);
  }
  else if (self.x > self.ctx.canvas.width - self.size) {
    self.setDirection(-1);
  }
}
Player.prototype.ckeckCollision = function() {
  var self = this;
}
