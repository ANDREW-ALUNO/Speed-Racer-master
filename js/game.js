class Game {
  constructor() {

  }

  start() {

    form = new Form();
    form.display();
    player = new Player();
    player.getCount()

    bike1 = createSprite(player.positionX, player.positionY)
    bike2 = createSprite(player.positionX, player.positionY)
    bike3 = createSprite(player.positionX, player.positionY)
    bike4 = createSprite(player.positionX, player.positionY)

    bike1.addImage(bikeImg1)
    bike1.addImage("blast", explosionImg)
    bike2.addImage(bikeImg2)
    bike2.addImage("blast", explosionImg)
    bike3.addImage(bikeImg3)
    bike3.addImage("blast", explosionImg)
    bike4.addImage(bikeImg4)
    bike4.addImage("blast", explosionImg)

    bike1.debug = true
    bike2.debug = true
    bike3.debug = true
    bike4.debug = true

    bike1.scale = 0.1
    bike2.scale = 0.1
    bike3.scale = 0.1
    bike4.scale = 0.1

    bikes = [bike1, bike2, bike3, bike4]
  }

  getState() {
    database.ref("gameState").on("value", data => {
      gameState = data.val()
    })
  }
  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }
  play() {
    form.hide()
    Player.getPlayersInfo()
    player.getBikeAtEnd()
    if (allPlayers != undefined) {
      this.playerControl()
      background("#263238")
      image(trackImg, 0, -height * 4, width, height * 5)
      var index = 0, x, y;
      for (var p in allPlayers) {
        index++
        x = allPlayers[p].positionX
        y = allPlayers[p].positionY
        bikes[index - 1].x = x
        bikes[index - 1].y = y
        if (player.blast && player.index == index) {
          bikes[index - 1].changeImage("blast")
          bikes[index - 1].scale = 0.2
        }
        if (keyIsDown(UP_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allPlayers[p].rotation
        }
        if (keyIsDown(LEFT_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allPlayers[p].rotation
        }
        if (keyIsDown(RIGHT_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allPlayers[p].rotation
        }
        if (index == player.index) {
          fill("red")
          stroke("black")
          ellipse(x, y, 60, 60)
          camera.position.y = bikes[index - 1].y
        }
        this.handleBikeColision(player.index)
      }
      if (player.distance > 2450) {
        gameState = 2
        player.rank++
        player.updateBikeAtEnd(player.rank)
        player.update()
      }
      drawSprites()
    }
  }
  playerControl() {
    if (keyIsDown(UP_ARROW) && !player.blast) {
      player.positionY -= 10
      player.distance += 10
      player.rotation = 0
      player.update()
    }
    if (keyIsDown(LEFT_ARROW) && !player.blast) {
      player.positionX -= 5
      player.rotation = -25
      player.update()
    }
    if (keyIsDown(RIGHT_ARROW) && !player.blast) {
      player.positionX += 5
      player.rotation = 25
      player.update()
    }
  }
  end() {
    form.end()
  }
  handleBikeColision(index) {
    if (index - 1 == 0) {
      if (bikes[index - 1].collide(bikes[1]) || bikes[index - 1].collide(bikes[2]) || bikes[index - 1].collide(bikes[3])) {
        player.blast = true
        player.update()
      }
    }
    if (index - 1 == 1) {
      if (bikes[index - 1].collide(bikes[0]) || bikes[index - 1].collide(bikes[2]) || bikes[index - 1].collide(bikes[3])) {
        player.blast = true
        player.update()
      }
    }
    if (index - 1 == 2) {
      if (bikes[index - 1].collide(bikes[1]) || bikes[index - 1].collide(bikes[0]) || bikes[index - 1].collide(bikes[3])) {
        player.blast = true
        player.update()
      }
    }
        if (index - 1 == 3) {
      if (bikes[index - 1].collide(bikes[1]) || bikes[index - 1].collide(bikes[2]) || bikes[index - 1].collide(bikes[0])) {
        player.blast = true
        player.update()
      }
    }
  }
}
