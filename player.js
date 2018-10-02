function Player(canvas, y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 60;
  self.x = 10;
  self.y = y - self.size * 2;
  self.vel = 8;
  self.direction = 0;
  self.lives = 3;
}
Player.prototype.update = function() {
  var self = this;
  self._checkLimits();
  self.x += self.direction*self.vel;
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
  if (self.x < 10) {
    self.x += 8
  }
  else if (self.x > self.ctx.canvas.width - self.size - 10) {
    self.x -=8;
  }
}
Player.prototype.checkCollision = function(object) {
  var self = this;

  var crashTop = self.y < object.y + object.size;
  var crashRight = self.x + self.size > object.x;
  var crashBottom = self.y + self.size > object.y ;
  var crashLeft = self.x < object.x + object.size ;

  if (crashLeft && crashRight && crashTop && crashBottom) {
    return true;
  }

  return false;
}
