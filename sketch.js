var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States for the game.

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg     = loadImage("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/0acaeafb-7ed1-4e4c-8987-5c4a2e222f5f.png");
  boyImg      = loadAnimation("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/fbf091c0-ea57-4441-8b5c-dcda77159de1.png","https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/ceb4c29d-8105-4a77-9476-14051053ae1b.png");
  cashImg     = loadImage("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/bf0bc14b-9c5b-4453-ae01-a0eb62a4c73f.png");
  diamondsImg = loadImage("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/df262a18-f6c9-41b9-814c-ad9b296e3c06.png");
  jwelleryImg = loadImage("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/471b02a3-0d4f-40fd-8c59-30991ee21588.png");
  swordImg    = loadImage("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/f7acf860-da00-486f-98bf-aa6be8fc6d72.png");
  endImg      = loadAnimation("https://assets.editor.p5js.org/5fd72bf0e449a500243a6d17/d623a6d9-2d01-4a9a-a7f4-82b9e26821a8.png");
}

function setup(){
  
  createCanvas(500,600);
  
  // Moving background
  path = createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  
  //creating boy running
  boy = createSprite(250,525);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  cashG      = new Group();
  diamondsG  = new Group();
  jwelleryG  = new Group();
  swordGroup = new Group();
  
  boy.setCollider("circle",0,0,550);
}

function draw() {

  if(gameState === PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
        cashG.destroyEach();
        treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
             diamondsG.destroyEach();
             treasureCollection = treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
             jwelleryG.destroyEach();
             treasureCollection = treasureCollection + 150;
      
    }else{if(swordGroup.isTouching(boy)) {
        gameState = END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale = 0.6;
  
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale = 0.12;
  cash.velocityY = 3;
  cash.lifetime = 210;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 200 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 6;
  jwellery.lifetime = 210;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 120 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 7;
  sword.lifetime = 210;
  swordGroup.add(sword);
  }
}