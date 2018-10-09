class Ingredient{

  constructor(canvas, x){

    this.ctx = canvas.getContext('2d')
    this.size = 60;
    this.x = x;
    this.y = 0
    this.vel = 5;
    this.variety = ["death", "top-bread", "lettuce", "meat", "cheese", "onion","bacon","tomato","ketchup","mayonnaise"]
    this.isWho();
  }


  update() {

    this.y += this.vel
  }
  render() {
    const img = document.createElement('img')
    img.src = 'images/' + this.condition + '.png'
    this.ctx.drawImage(img ,this.x, this.y, this.size, this.size); 
    
    // if(this.condition === "enemy"){
    //   this.ctx.fillStyle = "red";
    // }else if(this.condition === "friend"){
    //   this.ctx.fillStyle = "green";
    // }
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  isDeath() {
    return this.y > this.ctx.canvas.height;
  }
  isWho() {

    const random = Math.floor(Math.random() * 10)
    this.condition = this.variety[random]
    
  }
}