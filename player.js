function Player(canvas,y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 80;
  self.x = 0;
  self.y = y - self.size * 2;
  self.vel = 5;
  self.direction = 0;
  self.lives = 3;
}
Player.prototype.update = function() {
  var self = this;
  self._checkLimits();
  self.x += self.direction;
  self.direction = 0;
}
Player.prototype.render = function() {
  var self = this;

  var img = document.createElement('img')
  img.src = 'images/burger-box.png'
  self.ctx.drawImage(img,self.x, self.y, self.size, self.size);

  // self.ctx.fillStyle = "blue";
  // self.ctx.fillRect(self.x, self.y, self.size, self.size);
};
Player.prototype.setDirection = function(direction) {
  var self = this;
  self.direction = direction
};
Player.prototype._checkLimits = function() {
  var self = this;
  if (self.x < 0) {
    self.setDirection(50);
  }
  else if (self.x > self.ctx.canvas.width - self.size) {
    self.setDirection(-50);
  }
}
Player.prototype.checkCollision = function(object) {
  var self = this;

  var crashTop = self.y < object.y;
  var crashRight = self.x + self.size > object.x;
  var crashBottom = self.y + self.size > object.y + object.size ;
  var crashLeft = self.x < object.x ;

  if (crashLeft && crashRight && crashTop && crashBottom) {
    return true;
  }

  return false;
}
