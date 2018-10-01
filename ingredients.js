function Ingredient(canvas, x, y) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 60;
  self.x = x;
  self.y = 0
  self.vel = 3;
  self.variety = ["tomate", "top-bread", "lettuce", "meat", "bacon", "mayonnaise", "ketchup", "mustard", "onion"]
  self.isWho();

}
Ingredient.prototype.update = function() {
  var self = this;

  self.y += self.vel
}
Ingredient.prototype.render = function() {
  var self = this;
  var img = document.createElement('img')
  img.src = 'images/' + self.condition + '.png'
  self.ctx.drawImage(img ,self.x, self.y, self.size, self.size); 
  
  // if(self.condition === "enemy"){
  //   self.ctx.fillStyle = "red";
  // }else if(self.condition === "friend"){
  //   self.ctx.fillStyle = "green";
  // }
  // self.ctx.fillRect(self.x, self.y, self.size, self.size);
}
Ingredient.prototype.isDeath = function() {
  var self = this;
  return self.y > self.ctx.canvas.height;
}
Ingredient.prototype.isWho = function() {
  var self = this;

  var random = Math.floor(Math.random() * 9)
  self.condition = self.variety[random]
  console.log(self.condition)
  
}