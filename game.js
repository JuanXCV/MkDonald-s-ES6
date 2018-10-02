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
        <div>
          <button class='pause'>||</button>
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
  self.pauseButton = document.querySelector('.pause')
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
  self.ingredientsCollided = [];
  //Crear jugador
  self.player = new Player(self.canvasElement, self.height);
  //Mover jugador


  self._handleKeyUp = function(evt) {
    if (evt.key === "ArrowRight") {
      self.player.setDirection(0)
    }
    if (evt.key === "ArrowLeft") {
      self.player.setDirection(0)
    }
  }
  document.addEventListener("keyup",self._handleKeyUp);

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

  self.play = "play"

  self.playGame = function() {
    self.play = "play"
    self.pauseButton.removeEventListener('click',self.playGame)
    self.pauseButton.addEventListener('click', self.pauseGame)
    requestAnimationFrame(loop)
  }
  self.pauseGame = function() {
    self.play = "pause"
    self.pauseButton.removeEventListener('click', self.pauseGame)
    self.pauseButton.addEventListener('click',self.playGame)
  }
  self.pauseButton.addEventListener('click',self.pauseGame)
  function loop(){
    self._clearAll();
    self._updateAll();
    self._renderAll();
   

    if(self._isPlayerAlive() && self.play==="play"){
      requestAnimationFrame(loop);
    } else if(self.play==="pause") {
      
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
  self.ingredients = self.ingredients.filter(function(item) {
    if (item.isDeath()) {
      return false;
    }
    return true;
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
  self.ingredients.forEach(function(item){
    item.render();
  })
  self.player.render(self.ingredientsCollided);
}

Game.prototype._clearAll = function() {
  
  var self = this;
  if(self.ingredientsCollided[0]){
    self.lastIngredient = self.ingredientsCollided[self.ingredientsCollided.length-1]; 
    if(self.lastIngredient.condition === "top-bread"){
      self.score += self.ingredientsCollided.length
      self.ingredientsCollided = []
      self.player.reSize();
    }
  }

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
  self.ingredients.forEach(function(item, idx) {
    if(self.player.checkCollision(item)) {
      // /////////
      // if(item.condition === "friend"){
      //   self.score += 1;
      // } else if(item.condition === "enemy"){
      //   self.player.lives -= 1;
      // }
      // /////////
    var collided = self.ingredients.splice(idx, 1);
    self.ingredientsCollided.push(collided[0])
    }
  });
}
Game.prototype._isPlayerAlive = function() {
  var self = this;
  return self.player.lives > 0 && self.player.sizeY > 0

}
Game.prototype._updateUI = function() {
  var self = this;

  self.scoreElement.innerText = self.score;
  self.livesElement.innerText = self.player.lives;
}
Game.prototype.onOver = function(callback) {
  var self = this;
  self.OnGameOverCallback = callback;
}
Game.prototype.destroy = function() {
  var self = this;
  document.removeEventListener("keydown" , self._handleKeyDown)
  self.gameElement.remove();
}