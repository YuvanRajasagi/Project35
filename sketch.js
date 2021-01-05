//Create variables here
var database
var dog, happyDog 
var dogImage;
var database, data;
var foodStock;
var foodS, foodObj;
var feedDog, addFood;
var milk;
var feed;
var feedTime;
var lastFed;
// var feedDog = [];
// var addFoods = [];

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  feed = createButton("Feed Dog");
  feed.position(600,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,100);
  addFood.mousePressed(addFoods);
  
  //create sprite for dog and add dogImage
  dog = createSprite(300,250,20,20);
	dog.addImage(dogImage);
  dog.scale = 0.1;
}


function draw() {  
  background("lightgreen");

  foodObj.display();

  feedTime = database.ref("FeedTime");
  feedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254)
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + "PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}
