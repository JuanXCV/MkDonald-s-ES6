class Player {
  constructor(canvas, y) {
    this.ctx = canvas.getContext('2d')
    this.size = 60;
    this.x = 10;
    this.y = y - this.size * 3;
    this.vel = 8;
    this.direction = 0;
    this.lives = 1;
    this.sizeY = this.y;
  }
  update() {
    
    this._checkLimits();
    this.x += this.direction*this.vel;
  }
  render(ingredients) {
    

    const img = document.createElement('img')
    img.src = 'images/burger-box.png'
    this.ctx.drawImage(img,this.x, this.y, this.size, this.size-20);

    if(ingredients) {
      ingredients.forEach((item,idx) => {
        const sizeY = (item.size/3) * (idx+1)
        this.sizeY = this.y - sizeY

        const img2 = document.createElement('img')
        img2.src = 'images/' + item.condition + '.png'
        
        this.ctx.drawImage(img2 ,this.x, this.sizeY, this.size, this.size-20); 
      })
    }
    // this.ctx.fillStyle = "blue";
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  };
  setDirection(direction) {
    
    this.direction = direction
  };
  _checkLimits() {
    
    if (this.x < 10) {
      this.x += 8
    }
    else if (this.x > this.ctx.canvas.width - this.size - 10) {
      this.x -=8;
    }
  }
  checkCollision(object) {
    

    const crashTop = this.sizeY < object.y + object.size;
    const crashRight = this.x + this.size > object.x;
    const crashBottom = this.sizeY + this.size > object.y ;
    const crashLeft = this.x < object.x + object.size ;

    if (crashLeft && crashRight && crashTop && crashBottom) {
      return true;
    }

    return false;
  }
  reSize() {
    
    this.sizeY = this.y
  }
}
