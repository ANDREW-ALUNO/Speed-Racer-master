var database;
var form, game, player;
var gameState = 0, playerCount = 0;
var trackImg;
var bgimg,end_bg,explosionImg;
var bike1,bike2,bike3,bike4,bikeImg1,bikeImg2,bikeImg3,bikeImg4,bikes = [];
var allPlayers;


function preload() {
  bgimg = loadImage("./assets/images/background1.png");
  trackImg = loadImage("./assets/images/track.png")
  bikeImg1 = loadImage("./assets/images/bike1.png")
  bikeImg2 = loadImage("./assets/images/bike2.png")
  bikeImg3 = loadImage("./assets/images/bike3.png")
  bikeImg4 = loadImage("./assets/images/bike4.png")
  explosionImg = loadImage("./assets/images/blast.png")
  end_bg = loadImage("./assets/images/leaderboard2.png")
}

function setup() {

  canvas = createCanvas(950, 470);
  database = firebase.database()
  game = new Game();
  game.start();
  game.getState()
}

function draw() {
  if (gameState === 0) {
    background(bgimg);
  }
  if(playerCount == 4){
    game.updateState(1)
  }
  if(gameState == 1){
    clear()
    game.play()
  }
  if(gameState == 2){
    clear()
    background(end_bg)
    game.end()
  }
}


