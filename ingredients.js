function Ingredient(canvas, x) {
  var self = this;
  self.ctx = canvas.getContext('2d')
  self.size = 60;
  self.x = x;
  self.y = 0
  self.vel = 3;
  self.variety = ["death", "top-bread", "lettuce", "meat", "cheese", "onion","bacon","tomato","ketchup","mayonnaise"]
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

  var random = Math.floor(Math.random() * 10)
  self.condition = self.variety[random]
  
}