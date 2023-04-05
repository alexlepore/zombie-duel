let prompt = require("prompt");
let colors = require("colors");

let counter = 0;
let gameData = {
        user:{
                health:0,
                damage:0,
                guess:0
        },
        zombie:{
                health:0,
                damage:0,
                guess:0
        }
};

function randomNumGeneration(){
        gameData.user.health = parseInt(Math.random() * (100-50) + 50)
        gameData.zombie.health = parseInt(Math.random() * (100-50) + 50)
}

function checkResults(){
        if(gameData.zombie.health <=0){
                //zombie health less than or equal to zero, user wins
                console.log("You Won!".bold.green)
        } else if(gameData.user.health <=0){
                //user health less than or equal to zero, zombie wins
                console.log("You lost...".bold.red)
        } else{
                gameRound();
        }
}

function gameRound(){
        if(counter === 0 ){
                randomNumGeneration();
                counter = counter + 1;
        }
        
        prompt.start();
        console.log('Guess a number between 1 and 5'.bgBlue);
        prompt.get(['userGuess'], function (err, result) {
                //console.log(gameData.user.guess)
                gameData.user.guess = parseInt(result.userGuess)
                gameData.zombie.guess = parseInt(Math.floor(Math.random() * 5) + 1);
                gameData.zombie.damage = parseInt(Math.floor(Math.random() * 5) + 1);
                gameData.user.damage = parseInt(Math.floor(Math.random() * 5) + 1)
                
                //console.log(gameData.zombie.guess)
                //console.log(gameData.user.guess);

                if(gameData.user.guess === gameData.zombie.guess){
                         // decrease zombie health by user.damage
                        gameData.zombie.health -= gameData.user.damage;
                        console.log(`\nYou hit the zombie with ${gameData.user.damage} damage.`.bgGreen)
                        console.log(`Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}.\n`.magenta)
                } else {
                        gameData.user.health -= gameData.zombie.damage;
                        console.log(`\nThe zombie slashed you with ${gameData.zombie.damage} damage.`.bgRed)
                        console.log(`Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}.\n`.magenta)
                }

                checkResults();
                //check overall health after each round
        });

}

gameRound();
