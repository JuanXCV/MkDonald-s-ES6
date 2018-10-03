function Player(canvas, y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 60;
  self.x = 10;
  self.y = y - self.size * 3;
  self.vel = 8;
  self.direction = 0;
  self.lives = 1;
  self.sizeY = self.y;
}
Player.prototype.update = function() {
  var self = this;
  self._checkLimits();
  self.x += self.direction*self.vel;
}
Player.prototype.render = function(ingredients) {
  var self = this;

  var img = document.createElement('img')
  img.src = 'images/burger-box.png'
  self.ctx.drawImage(img,self.x, self.y, self.size, self.size-20);

  if(ingredients) {
    ingredients.forEach(function(item,idx){
      sizeY = (item.size/3) * (idx+1)
      self.sizeY = self.y - sizeY

      var img2 = document.createElement('img')
      img2.src = 'images/' + item.condition + '.png'
      
      self.ctx.drawImage(img2 ,self.x, self.sizeY, self.size, self.size-20); 
    })
  }
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

  var crashTop = self.sizeY < object.y + object.size;
  var crashRight = self.x + self.size > object.x;
  var crashBottom = self.sizeY + self.size > object.y ;
  var crashLeft = self.x < object.x + object.size ;

  if (crashLeft && crashRight && crashTop && crashBottom) {
    return true;
  }

  return false;
}
Player.prototype.reSize = function() {
  var self = this;
  self.sizeY = self.y
}
