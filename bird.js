
class Bird {
  constructor(x, y, width, height, xVelocity, yVelocity, gravity) {
    this.x = x
    this.y = y
    this.width = width //half of width,radius 
    this.height = height //half of height,radius 
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity - 1
    this.gravity = gravity
    this.dead = false
    this.rectX = null
    this.rectY = null
    this.rectWidth = null
    this.rectHeight = null
    this.direction = 0
    this.frame = 0
    score = 0
    this.sheet = null
  }

  draw() {
    fill(255)
    //ellipse(this.x, this.y, this.width * 2, this.height * 2)//draws the bird as a simple circle 
    fill(232, 22, 12)
    this.updateHitbox()//updates the hitobx parameters
    if (testingMode) {
      rect(this.rectX, this.rectY, this.rectWidth * 2, this.rectHeight * 2)//temporary function to be used for debugging the hitbox coordinates, will be removed when collision detection is working. 
    }
    //choosing the correct spritesheet for the character
    if (currentSheet === "bird") {
      this.sheet = birdSheet
    }
    else if (currentSheet === "donaldJump") {
      this.sheet = donaldJumpSheet
    }
    else if (currentSheet === "amongUs") {
      this.sheet = amongUsSheet
    }
    else if (currentSheet === "poland") {
      this.sheet = polandSheet
    }
    //using the chosen sprite sheet to display character 
    image(this.sheet, this.x - 20, this.y - 20, 40, 40, 0 + this.direction * 25, 0 + this.frame * 25, 25, 25);
    //direction: 0 for left, 1 for right 
  }

  update() {
    //x and y change based on velocity
    this.x += this.xVelocity
    this.y += this.yVelocity
    this.yVelocity += this.gravity //constantly pushed down at exponential rate 
    if (this.x + this.width > width || this.x - this.width < 0) {  //bounces the bird back if hits wall
      red = random(0, 255)
      green = random(0, 255)//new background colour 
      blue = random(0, 255)
      score++
      this.xVelocity *= -1
    }
    if (this.y > height) {
      this.die()
      currentScene = "subMenu" //redirects to pre-game menu
    }
    if (this.y < 0) {
      this.die()
      this.y = 0 //if hits the top of canvas
    }
    if (this.xVelocity > 0) {
      this.direction = 0
    }
    else {
      this.direction = 1
    }
    //frames of spritesheet
    if (this.frame > 7) {
      this.frame = 0
    }
    //next frame of animation every 5 frames of game
    else if (this.frame > 0) {
      if (frameCount % 5 === 0) {
        this.frame++
      }
    }
    //speeds up the bird to make the game harder
    this.xVelocity *= 1.0001
    this.yVelocity *= 1.0001
    this.updateHitbox()
  }

  touchesWall() {//checks if bird is touching the sides of canvas
    if (this.x + this.width > width || this.x - this.width < 0) {
      return true
    }
  }

  jump() {//called when mouse pressed
    if (!this.dead && currentScene === "game") {
      if (soundON) {
        flapSFX.play()
      }
      this.yVelocity = -6 // this changes the bird's velocity so that it is going up
      this.frame = 1
    }
  }

  die() {
    if (!this.dead) {
      this.dead = true
      this.yVelocity = 0
      if (score > highScore) {
        highScore = score
      }
      console.log("HighScore: " + highScore) // prints the high score 
    }
  }

  updateHitbox() {//added a rectangluar hitbox for collsion detection 
    this.rectX = this.x - (this.width * 3 / 4)//each parameter of the rctangle has a new varaible 
    this.rectY = this.y - (this.height * 3 / 4)
    this.rectWidth = this.width * 3 / 4
    this.rectHeight = this.height * 3 / 4
  }

  touches(object) {
    return (collideRectRect(object.rectX, object.rectY, object.rectWidth, object.rectHeight, this.rectX, this.rectY, this.rectWidth, this.rectHeight))
    // this line uses the p5 collide library to see if two rectangles have collided 
  }
}
