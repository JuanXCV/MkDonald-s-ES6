function Game(parent) {
  var self = this;
  self.parentElement = parent;
  self.gameElement = null;
  self.OnGameOverCallback = null;
  _init();
  _startLoop();
}

Game.prototype._init = function() {
  var self = this;
  //Construir el DOM
  self.gameElement = builDom(`
  
  `)
  //Seleccionar elementos del DOM
  self.canvasParent;
  self.canvasElement;
  self.livesElement;
  self.scoreElement;
  //Cambiar width y height
  self.width;
  self.height;
  //Tomar contexto
  self.ctx;
}

Game.prototype._startLoop = function() {
  var self = this;
  //Valores a 0 y []
  self.score = 0;
  self.ingredients = [];
  //Crear jugador
  self.player = new Player(canvasElement);
  //Mover jugador
  self._handleKeyDown = function(){

  }
  //addEventListener("keydown",self._handleKeyDown);
  //Loop
  function loop(){
    self._clearAll();
    self._updateAll();
    self._renderAll();
    //if player is alive or not
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function() {
  var self = this;
  //Crear ingrediente
  self._spawnIngredient();
  //Actualizar ingrediente
  self.ingredients.forEach(function(item) {
    item.update();
  });
  //Filtrar si ingredient es vivo o muerto
  self.ingredients = ingredients.filter(function(){
    self.isDeath();
  })
  //Actualizar player
  self.player.update();
  //Comprobar colisiones
  self._checkAllCollision();
  //Actualizar UI
  self._updateUI();
}

Game.prototype._renderAll = function() {
  var self = this;
  //Dibujar todo
  self.ingredients.forEach(function(ingredient){
    ingredient.render();
  })
  self.player.render();
}
Game.prototype._clearAll = function() {
  var self = this;
  //Limpiar todo
  self.ctx.clearRect()
}
Game.prototype._spawnIngredient = function() {
  var self = this;
  //Random para elegir coordenadas
  self.ingredients.push(new Ingredient(canvasElement,x,y));
}
Game.prototype._checkAllCollision = function() {
  var self = this;
  //Verificar Colisiones
}
Game.prototype._isPlayerAlive = function() {
  var self = this;
  //comprobar si el player esta vivo
}
Game.prototype._updateUI = function() {
  var self = this;
  scoreElement.innertext = self.score;
  livesElement.innertext = self.player.lives;
}
Game.prototype.onOver = function(callback) {
  var self = this;
  self.OnGameOverCallback = callback;
}
Game.prototype.destroy = function() {
  var self = this;
  self.gameElement.remove();
  //remove del Event Listener
}