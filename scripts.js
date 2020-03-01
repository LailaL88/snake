const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;
const ground = new Image();
ground.src = "./img/ground.png";

const foodImg = new Image();
foodImg.src = "./img/food.png";

const up = new Audio();
const right = new Audio();
const left = new Audio();
const eat = new Audio();
const down = new Audio();
const dead = new Audio();

up.src = "sounds/up.mp3"
right.src = "sounds/right.mp3"
left.src = "sounds/left.mp3"
eat.src = "sounds/eat.mp3"
down.src = "sounds/down.mp3"
dead.src = "sounds/dead.mp3"


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0;

let d;

document.addEventListener("keydown",direction);
function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}


function draw(){
    ctx.drawImage(ground,0,0);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y,box,box);

        ctx.strokeStyle = "tomato";
        ctx.strokeRect(snake[i].x, snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1 )* box,
            y: Math.floor(Math.random() * 15 + 3 )* box
        }
        eat.play();
    }else{
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box ){
        dead.play();
        clearInterval(game);
    }

    
    
    snake.unshift(newHead);

    if(snake.length > 30){
        ctx.fillText("You Win!!!", 7*box,10 * box);
        clearInterval(game);
    }

    ctx.fillStyle = "tomato";
    ctx.font = "bold 40px Zincel";
    ctx.fillText(score, 2.5 * box, 1.6 * box);

   
}



let game = setInterval(draw,200);

    
