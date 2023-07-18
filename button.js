//defines button class
class Button {
  constructor(text, x, y, w, h, click, desc, colour = 25) {
    this.x = x
    this.y = y
    this.text = text
    this.width = w
    this.height = h
    this.click = click //function passed in which will run on click 
    this.enabled = false
    this.desc = desc
    this.colour = colour
  }
  clicked() {
    if (this.enabled) {
      if (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y
        + this.height / 2) {
        // button is touched
        if (soundON) {
          clickSFX.play()
        }
        this.click()
      }
    }
  }
  render() {
    //displays the button
    if (this.enabled) {
      rectMode(CENTER)
      textAlign(CENTER)
      if (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y
        + this.height / 2) {
        // button is touched
        fill(255, 25, this.colour, 255)//if hovered on, buttons goes darker
      }
      else {
        fill(255, 25, this.colour, 200)
      }
      //button display
      stroke(255)
      rect(this.x, this.y, this.width, this.height, 5)
      fill(255)
      textSize(30)
      text(this.text, this.x, this.y + 10)
      rectMode(CORNER)
      textAlign(LEFT)
    }
  }
}
//function which only enables buttons on a specific screen 
function enableButtons(type) {
  for (button of buttons) {
    if (button.desc === type) {
      button.enabled = true
    }
  }
}

//enables buttons in the options menu
function enableOptionsButtons() {
  for (button of buttons) {
    if (button.desc == "options") {
      button.enabled = true
    }
  }
}

//enables buttons in the sub menu
function enableSubMenuButtons() {
  for (button of buttons) {
    if (button.desc == "subMenu") {
      button.enabled = true
    }
  }
}

//disables ALL buttons 
function disableButtons() {
  for (button of buttons) {
    button.enabled = false
  }
}

//function which handles the displaying of messages in the pre-game menu
function message(txt) {
  fill(221, 160, 221)
  rect(width / 2 - 150, height / 2 + 120, 300, 50, 10)
  fill(255)
  textSize(25)
  text(txt, width / 2 - 140, height / 2 + 150)
}

//all of the buttons in the game are defined below
function defineButtons() {
  //main menu
  let i = new Button("PLAY", width / 2, height / 2 + 50, 220, 50, () => { currentScene = "subMenu" }, "mainMenu") //defines start button
  buttons.push(i)
  i = new Button("OPTIONS", width / 2, height / 2 + 110, 220, 50, () => { console.log("options"); currentScene = "options"; }, "mainMenu") //defines options button 
  buttons.push(i)
  i = new Button("LEADERBOARD", width / 2, height / 2 + 170, 220, 50, () => { currentScene = "leaderboard"; }, "mainMenu")
  buttons.push(i) // defines leaderboard button 
  //options menu
  i = new Button("SOUND", width / 2, height / 2 - 50, 220, 50, () => { soundON = !soundON; }, "options")
  buttons.push(i)
  i = new Button("MUSIC", width / 2, height / 2 + 10, 220, 50, () => { musicON = !musicON; }, "options")
  buttons.push(i)
  i = new Button("return", width / 2, height - 40, 220, 50, () => { currentScene = "mainMenu" }, "options", 250)
  buttons.push(i)
  //leaderboard
  i = new Button("return", width / 2, height - 40, 220, 50, () => { currentScene = "mainMenu" }, "leaderboard", 250)
  buttons.push(i)
  //subMenu
  i = new Button("return", width / 2, height - 40, 220, 50, () => { currentScene = "mainMenu" }, "subMenu", 250)
  buttons.push(i)
  i = new Button("PLAY", width / 2, height / 2 + 50, 220, 50, () => { currentScene = "game"; fadeInSpikes(); bird = new Bird(width / 2, height / 2, 15, 15, 4, 0, 0.3); }, "subMenu")
  buttons.push(i)
  i = new Button("Hu-bird", width / 2 - 100, height / 2 + 120, 180, 50, () => { currentSheet = "bird" }, "subMenu")
  buttons.push(i)
  i = new Button("10 coins", width / 2 + 100, height / 2 + 120, 180, 50, () => { if (!donaldJumpUnlocked) { if (coinCounter >= 10) { coinCounter -= 10; donaldJumpUnlocked = true; buttons[10].text = "Dnld_Jump"; currentSheet = "donaldJump"; currentMessage = "purchase successful" } else { currentMessage = " not enough money!" } } else { currentSheet = "donaldJump" } }, "subMenu") //button which unlocks the donald jump character 
  buttons.push(i)
  i = new Button("20 coins", width / 2 - 100, height / 2 + 190, 180, 50, () => { if (!amongUsUnlocked) { if (coinCounter >= 20) { coinCounter -= 20; amongUsUnlocked = true; buttons[11].text = "Imposter"; currentSheet = "amongUs"; currentMessage = "purchase successful" } else { currentMessage = " not enough money!" } } else { currentSheet = "amongUs" } }, "subMenu") //button which unlocks the amongus character 
  buttons.push(i)
  i = new Button("30 coins", width / 2 + 100, height / 2 + 190, 180, 50, () => { if (!polandUnlocked) { if (coinCounter >= 30) { coinCounter -= 30; polandUnlocked = true; buttons[12].text = "Poland"; currentSheet = "poland"; currentMessage = "purchase successful" } else { currentMessage = " not enough money!" } } else { currentSheet = "poland" } }, "subMenu") //button which unlocks the poland character 
  buttons.push(i)
}
