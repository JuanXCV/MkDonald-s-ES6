function Player(canvas) {
  var self = this;
  self.x = 0;
  self.y; // = a MaxHeight
  self.vel = 5
  self.size; //Por determinar
  self.direction = 0
  self.lives = 1;
  self.ctx; //canvas.getContext('2d')
}
Player.prototype.update = function() {
  var self = this;
  self.x += (self.vel * self.direction);
  self._checkLimits();
}
Player.prototype.render = function() {
  var self = this;
};
Player.prototype.setDirection = function() {
  var self = this;
};
Player.prototype._checkLimits = function() {
  var self = this;
}
Player.prototype.ckeckCollision = function() {
  var self = this;
}
