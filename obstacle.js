//defines obstacle class
class Obstacle {
  constructor() {
    this.x = null
    this.y = null
    this.width = null
    this.height = null
    this.velocity = 0
    this.side = "left"
    this.desiredX = null
    this.currentState = "stationary"
    this.rectX = null
    this.rectY = null
    this.rectWidth = null
    this.rectHeight = null
  }
  draw() {
    fill(255, 25, 25) // sets the right colour for the traingles 
    this.updateHitbox() // updates the coordinates of the hitboxes 
    if (this.side === "left") { // on the left side of the canvas, tip of the triangle is on the right 
      triangle(this.x + this.width, this.y - this.height / 2, this.x, this.y - this.height, this.x, this.y)
    }
    else if (this.side === "right") { // on the right side of the canvas, tip of the triangle is on the left 
      triangle(this.x - this.width, this.y - this.height / 2, this.x, this.y - this.height, this.x, this.y)
    }
    if (testingMode) {
      rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight) //showing hitboxes
    }
  }

  update() {
    this.x += this.velocity // for animation 
  }

  fadeInPosition() {//moves the spikes to the correct position before fading them in 
    if (this.side === "left") {
      this.desiredX = this.x
      this.x -= this.width
    }
    else {
      this.desiredX = this.x
      this.x += this.width
    }
    this.currentState = "fadingIn"
    this.setVelocity(2)
  }

  fadeOutPosition() {//moves the spikes to the correct position before fading them out 
    if (this.side === "left") {
      this.desiredX = this.x - this.width
    }
    else {
      this.desiredX = this.x + this.width
    }
    this.currentState = "fadingOut"
    this.setVelocity(-2)
  }

  addNewValues(x, y, width, height, side) {//sets new values to the spike
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.side = side //which side of the screen are to be on (left/right) , changes the top of the triangle

  }

  setVelocity(velocity) {
    //velocity depends on the side of the canvas
    if (this.side === "left") {
      this.velocity = velocity
    }
    else {
      this.velocity = -1 * velocity
    }
  }

  updateHitbox() {// this function is responsible for assigninging values for the rectangle coordinates based on the coordiantes of the triangle. 
    if (this.side === "left") {
      this.rectX = this.x //there are seperate x,y,width,height variables for the recatngle. 
      this.rectY = this.y - (this.height * 3 / 4)
      this.rectWidth = this.width / 2
      this.rectHeight = this.height / 2
    }
    else {
      this.rectWidth = this.width / 2
      this.rectHeight = this.height / 2
      this.rectX = this.x - this.rectWidth
      this.rectY = this.y - (this.height * 3 / 4)
    }
  }

}

//functions required outside of the object to tie all of the obstacle objects together. 
function createSpikes(numSpikes, x, spikeWidth, spikeHeight, wallHeight, side) {
  let yValues
  yValues = yValuesCalculator(numSpikes, spikeHeight, wallHeight) //uses the function below to generate random y values 
  fill(0)
  if (side === "both") { //spikes are the same on both sides, making the game symmetrical
    for (yValue of yValues) {// for loop to add spikes on the left
      let spike = new Obstacle()
      spike.addNewValues(x, yValue, spikeWidth, spikeHeight, "left")
      spikes.push(spike)
    }
    for (yValue of yValues) { //for loop to add spikes on the left with the same yValues. 
      let spike = new Obstacle()
      spike.addNewValues(width - x, yValue, spikeWidth, spikeHeight, "right")
      spikes.push(spike)
    }
  }
  else {
    for (yValue of yValues) {//only creates spikes on the specified side. 
      let spike = new Obstacle()
      spike.addNewValues(x, yValue, spikeWidth, spikeHeight, side)
      spikes.push(spike)
    }
  }
}

function drawSpikes() { //draws the obstacles
  for (spike of spikes) {
    spike.draw()
  }
}

function fadeInSpikes() {
  for (spike of spikes) {
    spike.fadeInPosition() //fades in the spikes 
  }
}

function fadeOutSpikes() {
  if (!bird.dead) {
    for (spike of spikes) {
      spike.fadeOutPosition() //fades out spikes, called when bird touches wall 
    }
  }
}

function updateSpikes() {
  let newSpikes = false
  for (spike of spikes) {
    spike.update()
    //if the animation has finished
    if (spike.x === spike.desiredX) {
      if (spike.currentState === "fadingOut") {
        spike.velocity = 0
        newSpikes = true // flag that new spikes need to be created
      }
      if (spike.currentState === "fadingIn") {
        spike.velocity = 0
      }
    }
  }

  if (newSpikes) {//if the need for new spikes has been flagged
    spikes = []
    createSpikes(8, 0, 30, 30, height, "both")
    fadeInSpikes()
  }
}

function yValuesCalculator(numSpikes, spikeHeight, wallHeight) {
  //array with all of the y values of the higher corner of spikes
  let yValues = []
  let newY
  let added

  if (numSpikes * spikeHeight >= wallHeight * 3 / 4) {//if spikes wouldtake up too much screen
    return "E: not enough space"
  }
  for (i = 0; i <= numSpikes; i++) {
    added = false
    while (added === false) {
      newY = floor(random(0 + spikeHeight, wallHeight))
      if (yValues.length === 0) {
        yValues.push(newY)
        added = true
      }
      else if (isInArrayRange(newY, yValues, spikeHeight)) {
        //no values added program loops again 
      }
      else {
        yValues.push(newY)// if new vlue is valid 
        added = true
      }
    }
  }
  return yValues
}

function isInArrayRange(value, array, range = 0) {
  for (i = 0; i <= array.length; i++) { //checks if two values in an array are within a range from each other
    if (value <= array[i] + range && value >= array[i] - range) {
      return true
    }
  }
  return false
}