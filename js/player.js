class Player {
  constructor() {
    this.name = null
    this.index = null
    this.distance = 0
    this.positionX = 0
    this.positionY = 400
    this.rank = 0
    this.rotation = 0
    this.blast = false
  }
  getCount() {
    database.ref("playerCount").on("value", data => {
      playerCount = data.val()

    })
  }
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    })

  }
  getBikeAtEnd(){
    database.ref("bikeAtEnd").on("value", data => {
      this.rank = data.val()
    })
  }
  updateBikeAtEnd(rank){
    database.ref("/").update({
      bikeAtEnd: rank
    })    
  }

  addPlayer() {
    if (this.index == 1) {
      this.positionX = width / 2 - 250

    } else if (this.index == 2) {
      this.positionX = width / 2 - 100

    } else if (this.index == 3) {
      this.positionX = width / 2 + 100
    } else if (this.index == 4) {
      this.positionX = width / 2 + 250
    }
    var playerIndex = "players/player"+ this.index
    database.ref(playerIndex).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      distance:this.distance,
      rotation : this.rotation,
      blast : this.blast
    })
  }
  static getPlayersInfo(){
    database.ref("players").on("value",data => {
      allPlayers = data.val();
    })

  }
  update(){
    var playerIndex = "players/player"+ this.index
    database.ref(playerIndex).update({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      rank:this.rank,
      distance:this.distance,
      rotation : this.rotation,
      blast : this.blast
    })
  }
}
