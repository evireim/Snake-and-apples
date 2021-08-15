"use strict"

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let score = 0;
let box = 32;

let ground = new Image();
ground.src = "img/backgroundP2.png";
let apple = new Image();
apple.src = "img/apple2.png";
let snakeLeft = new Image();
snakeLeft.src = "img/snakeLeft.png";
let snakeRight = new Image();
snakeRight.src = "img/snakeRight.png";
let snakeUp = new Image();
snakeUp.src = "img/snakeUp.png";
let snakeDown = new Image();
snakeDown.src = "img/snakeDown.png";
let snakeBody = new Image();
snakeBody.src = "img/snakeBody.png";

let keyPres;
let timeOut;
let boost = 0;
let snakeSpeed = "Скорость";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

let snake = [];
snake[0] = {
  x: 10 * box,
  y: 10 * box,
};


let buttonReset = document.querySelector(".btn-reset");
buttonReset.addEventListener("click", () => {
  location.reload();
});

document.addEventListener("keydown", direction);
function direction(event) {
  if (event.keyCode == 37 && keyPres != "right") {
    keyPres = "left";  
  } else if (event.keyCode == 38 && keyPres != "down") {
    keyPres = "up";  
  } else if (event.keyCode == 39 && keyPres != "left") {
    keyPres = "right";  
  } else if (event.keyCode == 40 && keyPres != "up") {
    keyPres = "down";  
  }
}

let modalContainer = document.querySelector(".modal-container");
modalContainer.style.display = "block";
setTimeout(() => {
  showModalBackground();
}, 30)

function showModalBackground() {
  let modalBackground = document.querySelector(".modal-background");
  modalBackground.style.height = "100vh";
}

let gameCurrSpeed = 200;

let snakeX = snake[0].x;
let snakeY = snake[0].y;
function border() {
  if (snakeX < box || snakeX > box * 19 || snakeY < box || snakeY > box * 19) {
      gameCurrSpeed = 999999;
  } 
}
  
gameSpeed();

function gameSpeed() {
  timeOut = setTimeout(function() {
    drawSnake();
    if (score == 3) {
      gameCurrSpeed = 180;
      boost = 10;
      border();
    } else if (score == 6) {
        gameCurrSpeed = 160;
        boost = 20; 
        border();
    } else if (score == 9) {
        gameCurrSpeed = 140;
        boost = 30;
        border();
    } else if (score == 15) {
        gameCurrSpeed = 120;
        boost = 40;
        border();
    } else if (score == 20) {
        gameCurrSpeed = 100;
        boost = 50;
        border();
    } else if (score == 25) {
        gameCurrSpeed = 80;
        boost = 60;
        border();
    } else if (score == 30) {
        gameCurrSpeed = 60;
        boost = 70;
        border();
    } else if (score == 35) {
        gameCurrSpeed = 40;
        boost = 80;
        border();
    } else if (score == 40) {
        gameCurrSpeed = 20;
        boost = 99;
        border();
    }
    gameSpeed();
  }, gameCurrSpeed);
}


function drawSnake() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(apple, food.x, food.y);
  
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(score, box * 4.5, box);
  
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("+" + boost + "%", box * 16.2, box);
  
  ctx.fillStyle = "orange";
  ctx.fonstStyle = "30px Arial";
  ctx.fillText(snakeSpeed, box * 12, box);
  
  for (let i = 0; i < snake.length; i++) {
    if (i === 0 && keyPres == "left") {
      ctx.drawImage(snakeLeft, snake[i].x, snake[i].y);
    } else if (i === 0 && keyPres == "right") {
        ctx.drawImage(snakeRight, snake[i].x, snake[i].y);
    } else if (i === 0 && keyPres == "up") {
        ctx.drawImage(snakeUp, snake[i].x, snake[i].y);
    } else if (i === 0 && keyPres == "down") {
        ctx.drawImage(snakeDown, snake[i].x, snake[i].y);
    } else {
        ctx.drawImage(snakeBody, snake[i].x, snake[i].y);
    }
  }
  
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
     snake.pop();
  }
  
  if (keyPres == "left") {
    snakeX -= box;
  } else if (keyPres == "right") {
    snakeX += box;
  } else if (keyPres == "up") {
    snakeY -= box;
  } else if (keyPres == "down") {
    snakeY += box;
  }
  
  let snakeHead = {
    x: snakeX,
    y: snakeY,
  };
  
  border();
   
  function eatBody(head, arry) {
    for (let i = 0; i < arry.length; i++) {
      if (head.x == arry[i].x && head.y == arry[i].y) {
        gameCurrSpeed = 999999;
      }
    }   
  }     
  
  eatBody(snakeHead, snake); 
  
  snake.unshift(snakeHead);
}