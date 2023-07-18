// game function 
function game() {
  //disables all ilrelevant buttons 
  disableButtons()
  //black background
  background(0)
  //sets the colour of the background behind the score 
  fill(red, green, blue)
  //ellipse for the score to go inside of
  ellipse(width / 2, height / 2, 270, 270)
  fill(255)
  textSize(200)
  //score displayed in the background
  if (score < 10) {//if single digit
    text(score, width / 2 - 60, height / 2 + 60)
  }
  else {//if double digits 
    text(score, width / 2 - 120, height / 2 + 60)
  }
  fill(255)
  // updates and draws the spikes 
  updateSpikes()
  drawSpikes() 
  //updates and draws the bird  
  bird.update()
  bird.draw()
  //for every obstacle
  for (spike of spikes) {
    if (bird.touches(spike)) {
      //sound played
      if(soundON){
      smashSFX.play()
      }
      bird.die() //if collided end game 
    }
  }
  //if bird touches coin
  if(coin.hits(bird)){
    coin.available = false //coin already collected so make unavailable
    coinCounter++ //increment coin counter
  }
  //update the position and animation of coin
  coin.update()
  coin.draw()

  if (bird.touchesWall()) {
    if(soundON){
      scoreSFX.play()
      }
    fadeOutSpikes()
    //if the coin has been collected 
    if(!coin.available){
      //generate a new one
      coin.activate()
    }
  }
}

//main menu required functions 
function mainMenu() {
  //turn off irrelevant buttons
  disableButtons()
  //enable mainMenu buttons
  enableButtons("mainMenu")
  //grey background
  background(20, 0, 0)
  text("Don't touch\nthe spikes!", 100, height / 2 - 200)
  //ensure the buttons show up on screen 
  for (button of buttons) {
    button.render()
  }
}

//options required code 
function options() {
  background(20, 0, 0)
  disableButtons()
  enableButtons("options")
  //if statements which enable the toggleing of sound and music
  if(soundON){
    buttons[3].text = "SOUND: ✓" //SOUND button
  }
  else{
    buttons[3].text = "SOUND: ✘"
  }
  if(musicON){
    buttons[4].text = "MUSIC: ✓"
  }
  else{
    buttons[4].text = "MUSIC: ✘"
  }
  for (button of buttons) {
    button.render()
  }
}

//required code for leaderboard screen
function leaderboard() {
  background(20, 0, 0)
  disableButtons()
  enableButtons("leaderboard")
  //informs user that screen not yet completed
  text("TO BE ADDED", 100, height / 2)
  for (button of buttons) {
    button.render()
  }
}

//sub menu required code
function subMenu() {
  background(20, 0, 0)
  disableButtons()
  //functions required for score display 
  fill(255, 0, 0, 200)
  ellipse(width / 2, height / 2 - 170, 150, 150)
  fill(255)
  textSize(20)
  text("You scored:", width / 2 - 63, height / 2 - 185)
  textSize(80)
  if (score < 10) {//if single digit 
    text(score, width / 2 - 23, height / 2 - 120)
  }
  else {//if double digit shift display 
    text(score, width / 2 - 46, height / 2 - 120)
  }
  //functions required for coins display. 
  textSize(30)
  coinDisplay.draw()
  coinDisplay.update()
  if (coinCounter < 10) {
    text(": "+coinCounter,width/2-10,40)
  } else {//if double digit shift display 
    text(":"+coinCounter,width/2-10,40)
  }
  
  //functions required for highScore display
  fill(183, 110, 121)
  rect(width / 2 - 80, height / 2 - 80, 160, 60, 10)
  fill(255)
  image(trophy, width / 2 - 70, height / 2 - 70, 40, 40)
  textSize(70)
  if (highScore < 10) {
    text(highScore, width / 2 + 35, height / 2 - 29)
  } else { //if double digit shift display 
    text(highScore, width / 2 - 10, height / 2 - 29)
  }
  
  //functions for displaying buttons
  enableButtons("subMenu")
  for (button of buttons) {
    button.render()
  }
  
  //displays the current messgae if not blank
  if(currentMessage != ""){
    message(currentMessage)
  }
}
