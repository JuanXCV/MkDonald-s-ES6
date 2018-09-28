function Ingredient(canvas, x, y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 40;
  self.x = x;
  self.y = 0
  self.vel = 5;
  self.condition = null;
}
Ingredient.prototype.update = function() {
  var self = this;

  self.y += self.vel
}
Ingredient.prototype.render = function() {
  var self = this;
  self.ctx.fillStyle = "red";
  self.ctx.fillRect(self.x, self.y, self.size, self.size-30);
}
Ingredient.prototype.isDeath = function() {
  var self = this;
}
Ingredient.prototype.isWho = function() {
  var self = this;
}