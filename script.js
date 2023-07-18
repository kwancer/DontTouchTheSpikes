let spikes = [] //array with obstacles
let trophy, birdSheet, clickSFX, flapSFX, gameMusic, menuMusic, scoreSFX, smashSFX, coinIMG, donaldJumpSheet, amongUsSheet, polandSheet, currentSheet //the picture and sounds needed
let musicType //the music type (game or menu)
let buttons = [] //the array with the buttons for the menus
let canvasHolder //defines the variable for the canvas so that it can be moved around the webapge
let score = 0 //score counter 
let highScore = 0 //high score counter 
let currentScene = "mainMenu" //variable which stores what scene the game should display
let red, green, blue // variables for the colour of background of score counter - rgb (red,green,blue)
let coin // defines coin object 
let coinCounter = 0 //counts number of coins 
let coinDisplay //saves coin object 
let musicON = true, soundON = true // current state of sound and music
let testingMode = false // this variable can be changed to enter testing mode which displays hitboxes of the different elements 
//varables below store information on whether the player has unlocked a certain character
let donaldJumpUnlocked = false 
let amongUsUnlocked = false
let polandUnlocked = false
let currentMessage = "" //if a message needs to be displayed, its stored in this variable

function preload() { 
  //loading all the relevant sounds and images
  trophy = loadImage('img/trophy.png');
  birdSheet = loadImage("img/bird.png");
  clickSFX = loadSound("sfx/click.mp3");
  flapSFX = loadSound("sfx/flap.mp3")
  gameMusic = loadSound("sfx/gameMusic.mp3")
  menuMusic = loadSound("sfx/menuMusic.mp3")
  scoreSFX = loadSound("sfx/score.mp3")
  smashSFX = loadSound("sfx/smash.mp3")
  coinIMG = loadImage("img/coin.png")
  donaldJumpSheet = loadImage("img/donaldJump.png")
  amongUsSheet = loadImage("img/amongUs.png")
  polandSheet = loadImage("img/poland.png")
}
function setup() {
  currentSheet = "bird" //sets the initial character to the default spritesheet "bird"
  frameRate(60)
  // lowers sound and music volumes
  menuMusic.setVolume(0.2) 
  gameMusic.setVolume(0.1)
  //changes font to courier new
  textFont("Courier New")
  //creates a new canvas in the canvas-holder div
  canvasHolder = createCanvas(400, 600);
  canvasHolder.parent("canvas-holder")
  //uses the createSpikes function to  create spikes 
  //createSpikes(number of spikes, starting x, width, height, max y, which sides?)
  createSpikes(8, 0, 30, 30, height, "both") 
  //refernces the function which creates all of the buttons
  defineButtons()
  //creates the bird object 
  //bird(start x, start y, width, height,xVelocity,yVelocity, gravity(pull down) )
  bird = new Bird(width / 2, height / 2, 15, 15, 100, 0, 1)
  //random colour for the backgrond generated
  red = random(0, 255)
  green = random(0, 255)
  blue = random(0, 255)
  //music plays
  menuMusic.play()
  //defines coin for the game and coin display for the menu and activates the display
  coin = new Coin(200,200,30,30)
  coinDisplay = new Coin(width/2 -40,13,30,30)
  coinDisplay.available = true
}

function draw() {
  //choses the correct scene based on the current scene variable value and redirects to the correct function 
  if (currentScene === "mainMenu") {
    mainMenu()
    musicType = "menu"
  }
  else if (currentScene === "game") {
    game()
    musicType = "game"
  }
  else if (currentScene === "options") {
    options()
    musicType = "menu"
  }
  else if (currentScene === "leaderboard") {
    leaderboard()
    musicType = "menu"
  }
  else if (currentScene === "subMenu") {
    subMenu()
    musicType = "menu"
  }
  //plays the correct type of music, unless already playing in which case doing nothing
  if (musicType === "menu") {
    if (musicON) {
      if (!menuMusic.isPlaying()) {
        menuMusic.play()
        gameMusic.pause()
      }
    } else {
      menuMusic.pause()
    }
  }
  else if (musicType === "game") {
    if (musicON) {
      if (!gameMusic.isPlaying()) {
        gameMusic.play()
        menuMusic.pause()
      }
    } else {
      gameMusic.pause()
    }
  }
  
}

//events which occur only if user presses the mouse button
function mousePressed() {
  //resets the value of current message, so that it disappears when user clicks their mouse
  currentMessage = ""
  // calls the method inside the bird 
  bird.jump() 
  //checks all the buttons if the user has clicked inside any of them
  for (button of buttons) {
    button.clicked()
  }
}




