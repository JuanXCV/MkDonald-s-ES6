class Game{
  constructor(parent) {
    this.parentElement = parent;
    this.gameElement = null;
    this.OnGameOverCallback = null;
    this._init();
    this._startLoop();
  }

    _init() {
    //Construir el DOM
    this.gameElement = builDom(`
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
        <div class='buttons'>
          <div class="button-left"></div>
          <div class="button-right"></div>
        </div>
      </main>
    `)
        
    this.parentElement.appendChild(this.gameElement)
    //Seleccionar elementos del DOM
    this.mainElement = document.querySelector('.game')
    this.canvasParentElement = document.querySelector('.game-canvas')
    this.canvasElement = document.querySelector('.canvas')
    this.livesElement = document.querySelector('.lives .value')
    this.scoreElement = document.querySelector('.score .value')
    this.pauseButton = document.querySelector('.pause')
    this.leftButton = document.querySelector('.button-left')
    this.rightButton = document.querySelector('.button-right')
    //Cambiar width y height
    this.width = this.canvasParentElement.clientWidth;
    this.height = this.canvasParentElement.clientHeight;
    this.canvasElement.setAttribute('width', this.width);
    this.canvasElement.setAttribute('height', this.height);
    //Tomar contexto
    this.ctx = this.canvasElement.getContext('2d');

  }

  _startLoop() {
    //Valores a 0 y []
    this.count = 0;
    this.score = 0;
    this.ingredients = [];
    this.ingredientsCollided = [];
    //Crear jugador
    this.player = new Player(this.canvasElement, this.height);
    //Mover jugador


    this._handleKeyUp = evt => {
      if (evt.key === "ArrowRight") {
        this.player.setDirection(0)
      }
      if (evt.key === "ArrowLeft") {
        this.player.setDirection(0)
      }
    }
    document.addEventListener("keyup",this._handleKeyUp);


    this._handleKeyDown = evt => {
      if (evt.key === "ArrowRight") {
        this.player.setDirection(1)
      }
      if (evt.key === "ArrowLeft") {
        this.player.setDirection(-1)
      }
    }
    document.addEventListener("keydown",this._handleKeyDown);


    this._goLeft = () => {
      this.player.setDirection(-1)
    }

    this.leftButton.addEventListener('touchstart',this._goLeft)

    this._goRight = () => {
      this.player.setDirection(1)
    }

    this.rightButton.addEventListener('touchstart',this._goRight)

    this._stop = () => {
      this.player.setDirection(0)
    }

    this.leftButton.addEventListener('touchend',this._stop)
    this.rightButton.addEventListener('touchend',this._stop)


    //Loop

    this.play = "play"

    this.playGame = () => {
      this.play = "play"
      this.pauseButton.removeEventListener('click',this.playGame)
      this.pauseButton.addEventListener('click', this.pauseGame)
      document.removeEventListener('touchstart',this.playGame)
      document.removeEventListener('keydown',this.playGame)
      this.elementInstructions.remove()
      requestAnimationFrame(this.loop)
    }
    this.pauseGame = () => {
      this.play = "pause"
      this.pauseButton.removeEventListener('click', this.pauseGame)
      this.pauseButton.addEventListener('click',this.playGame)
    }
    this.pauseButton.addEventListener('click',this.pauseGame)

    this.loop = () => {
      this._clearAll();
      this._updateAll();
      this._renderAll();
      if(this.count===80){
        this.handleInstructions();
      }
    
      this.count ++

      if(this._isPlayerAlive() && this.play==="play"){
        requestAnimationFrame(this.loop);
      } else if(this.play==="pause") {
        
      } else {
        this.OnGameOverCallback();
      }
    }

    requestAnimationFrame(this.loop);
  }

  _updateAll() {
    //Crear ingrediente
    this._spawnIngredient();
    //Actualizar ingrediente
    this.ingredients.forEach(item => {
      item.update();
    });
    this.ingredients = this.ingredients.filter(item => {
      if (item.isDeath()) {
        return false;
      }
      return true;
    })
    //Actualizar player
    this.player.update();
    //Comprobar colisiones
    this._checkAllCollision();
    //Actualizar UI
    this._updateUI();
  }

  _renderAll() {
    //Dibujar todo
    this.ingredients.forEach(item => {
      item.render();
    })
    this.player.render(this.ingredientsCollided);
  }
  _clearAll() {
    //Limpiar todo
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  _spawnIngredient() {
    //Random para elegir coordenadas
    if (Math.random() > 0.98) {
      const randomX = Math.random() * this.width * 0.9;
      this.ingredients.push(new Ingredient(this.canvasElement, randomX));
    }
  }
  _checkAllCollision() {
    this.ingredients.forEach((item, idx) => {
      if(this.player.checkCollision(item)) {
      const collided = this.ingredients.splice(idx, 1);
      this.ingredientsCollided.push(collided[0])
      }
    })
    this.handleTopBurger();
    this.handleDeath();
  }
  _isPlayerAlive() {
    return this.player.lives > 0 && this.player.sizeY > 0

  }
  _updateUI() {

    this.scoreElement.innerText = this.score;
    this.livesElement.innerText = this.player.lives;
  }
  onOver(callback) {
    this.OnGameOverCallback = callback;
  }
  destroy() {
    document.removeEventListener("keydown" , this._handleKeyDown)
    this.gameElement.remove();
  }

  handleInstructions() {
    this.pauseGame();



    this.elementInstructions = builDom(`
      <div class='instructions-parent'>
        <div class='instructions-left'>
        </div>
        <div class='instructions-right'>
        </div>
      </div>
    `)
    this.mainElement.appendChild(this.elementInstructions)

    setTimeout(() => {
      document.addEventListener('touchstart',this.playGame)
      document.addEventListener('keydown',this.playGame)
    }, 1000);
  }
  handleTopBurger() {
    if(this.ingredientsCollided[0]){
      this.lastIngredient = this.ingredientsCollided[this.ingredientsCollided.length-1]; 
      if(this.lastIngredient.condition === "top-bread"){
        this.pauseGame();
        setTimeout(() => {
          this.score += this.ingredientsCollided.length-1
          this.ingredientsCollided = []
          this.player.reSize();
          ////
          // this.ingredients.forEach()
          ////
          this.playGame();
        },200);
      }
    }
  }
  handleDeath() {
    if(this.ingredientsCollided[0]){
      this.lastIngredient = this.ingredientsCollided[this.ingredientsCollided.length-1]; 
      if(this.lastIngredient.condition === "death"){
        setTimeout(() => {
          this.player.lives -=1
        },100);
      }
    }
  }
}