function Game(parent) {
  var self = this;
  self.parentElement = parent;
  self.gameElement = null;
  self.OnGameOverCallback = null;
  self._init();
  self._startLoop();
}

Game.prototype._init = function() {
  var self = this;
  //Construir el DOM
  self.gameElement = builDom(`
    <main class="game container">
      <header class="game-header">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game-canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
  `)
  self.parentElement.appendChild(self.gameElement)
  //Seleccionar elementos del DOM
  self.canvasParentElement = document.querySelector('.game-canvas')
  self.canvasElement = document.querySelector('.canvas')
  self.livesElement = document.querySelector('.lives .value')
  self.scoreElement = document.querySelector('.score .value')
  //Cambiar width y height
  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;
  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);
  //Tomar contexto
  self.ctx = self.canvasElement.getContext('2d');

}

Game.prototype._startLoop = function() {
  var self = this;
  //Valores a 0 y []
  self.score = 0;
  self.ingredients = [];
  //Crear jugador
  self.player = new Player(self.canvasElement, self.height);
  //Mover jugador
  self._handleKeyDown = function(evt){
    if (evt.key === "ArrowRight") {
      self.player.setDirection(1)
    }
    if (evt.key === "ArrowLeft") {
      self.player.setDirection(-1)
    }
  }
  document.addEventListener("keydown",self._handleKeyDown);
  //Loop
  function loop(){
    self._clearAll();
    self._updateAll();
    self._renderAll();
    if(self._isPlayerAlive()){
      requestAnimationFrame(loop);
    } else {
      self.OnGameOverCallback();
    }
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
  // //Filtrar si ingredient es vivo o muerto
  // self.ingredients = ingredients.filter(function(){
  //   self.ingredient.isDeath();
  // })
  //Actualizar player
  self.player.update();
  //Comprobar colisiones
  // self._checkAllCollision();
  //Actualizar UI
  // self._updateUI();
}

Game.prototype._renderAll = function() {
  var self = this;
  //Dibujar todo
  self.ingredients.forEach(function(item){
    item.render();
  })
  self.player.render();
}
Game.prototype._clearAll = function() {
  var self = this;
  //Limpiar todo
  self.ctx.clearRect(0, 0, self.width, self.height);
}
Game.prototype._spawnIngredient = function() {
  var self = this;
  //Random para elegir coordenadas
  if (Math.random() > 0.97) {
    var randomX = Math.random() * self.width * 0.9;
    self.ingredients.push(new Ingredient(self.canvasElement, randomX));
  }
}
Game.prototype._checkAllCollision = function() {
  var self = this;
  //Verificar Colisiones
}
Game.prototype._isPlayerAlive = function() {
  var self = this;
  return true;//Temporal
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