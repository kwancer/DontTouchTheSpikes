class Coin { //definition of coin class 
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y
    this.w = w
    this.h = h
    this.frame = 0;
    this.add = 1
    this.available = false
  }
  update() { // updates the animation of the coin
    if (frameCount % 6 === 0) {
      this.frame += this.add
      if (this.frame === 6) {
        this.frame = 0
      }
    }
  }
  draw() { // displays the coin on the canvas 
    //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
    if(this.available){
    image(coinIMG, this.x, this.y, this.w, this.h, 200 * this.frame, 0, 200, 200)//uses the spritesheet to display character 
    }
  }
  	hits(player) {//the function which checks if the coin is touching the passed in object 
      if(this.available){
		return collideRectCircle(player.rectX, player.rectY, player.rectWidth, player.rectHeight, this.x,this.y, this.w)}
	}

  activate(){ //makes the coin display 
    this.x = random(75, width -75)
    this.y = random(50, height - 50)
    this.available = true 
  }
}
