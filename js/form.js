class Form {
  constructor() {
    this.input = createInput("nome");
    this.buttonImg = createImg("./assets/images/start.png");
    this.greetings = createElement("h2");
    this.greetings2 = createElement("h2")
  }

  elementsPosition() {
    this.input.position(500, 180)
    this.input.size(180, 30)
    this.buttonImg.position(525, 250)
    this.buttonImg.size(150, 50)
    this.greetings.position(300,180)
    this.input.class('customInput')
  }

  hide() {
    this.input.hide()
    this.buttonImg.hide()
    this.greetings.hide()
  }

  buttonPressed() {
    this.buttonImg.mouseClicked(() => {
      this.input.hide()
      this.buttonImg.hide()
      player.name = this.input.value()
      playerCount++
      player.index = playerCount
      player.updateCount(playerCount)
      player.addPlayer()
      this.greetings.html("tenha uma boa corrida " + player.name)
    })
  }

  display() {
    this.elementsPosition()
    this.buttonPressed()
  }
  end(){
    var resetButton = createImg("../assets/images/Speed racer-21.png")
    resetButton.size(150,50)
    resetButton.position(100,20)
    resetButton.mousePressed(() => {
      player.updateCount(0)
      player.updateBikeAtEnd(0)
      game.updateState(0)
      database.ref("players").remove()
      this.greetings2.hide()
      window.location.reload()
    })
    this.greetings2.html("parabens " + player.name + " seu rank é " + player.rank )
      this.greetings2.position(350,285)
  }
}
