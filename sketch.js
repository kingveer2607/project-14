var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background, background1;
var sword, sword1;
   
var fruit, fruit1, fruit2, fruit3, fruit4;
var fruitGroup, swordGroup, enemyGroup;
var monster, monsterImage;
var gameOverImage;

function preload(){
  background1 = loadImage("fn.jpg");
  sword1 = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
}
function setup(){
  background = createSprite(0,0,600,600);
  background.addImage("background2",background1);
  background.scale = 2.75;
  
  fruitGroup = new Group();
  swordGroup = new Group();
  enemyGroup = new Group();
  
  sword = createSprite(200,200,20,20);
  sword.addImage("sword2",sword1);
  sword.scale = 0.8;
  swordGroup.add(sword);
  
  score = 0;
}
function draw(){
createCanvas(600,600);
  
  if(gameState === PLAY){
   if(swordGroup.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score=score+1;
   }
  if(swordGroup.isTouching(enemyGroup)){
    gameState = END;
  }
  }else if(gameState === END){
    enemyGroup.velocityY =0;
    enemyGroup.destroyEach();
    fruitGroup.velocityY =0;
    fruitGroup.destroyEach();
    
    sword.addImage("gameOver",gameOverImage);
    sword.x = 300;
    sword.y = 300;
    sword.velocityX = 0;
    sword.velocityY = 0;
  }
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  fruits();
  enemy();
  drawSprites();
   textSize(18);
  text("Score : "+ score,250,50);
}
function fruits(){
  if(World.frameCount%80 === 0){
    fruit = createSprite(600,600,20,20);
    fruit.scale = 0.2;
    r=Math.round(random(1,4));
    if(r === 1){
      fruit.addImage(fruit1);
    }else if(r === 2){
      fruit.addImage(fruit2);
    }else if(r === 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
  fruit.x= Math.round(random(50,540));
  fruit.velocityY = -6
  fruit.setLifetime = 100;
    
  fruitGroup.add(fruit);
  }
}
function enemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(600,600,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.x = Math.round(random(100,300));
    monster.velocityY = -6;
    monster.setLifetime = 100;
    enemyGroup.add(monster);
  }
}
