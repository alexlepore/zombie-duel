let prompt = require("prompt");
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
                console.log("You Won!")
        } else if(gameData.user.health <=0){
                //user health less than or equal to zero, zombie wins
                console.log("You lost...")
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
        console.log('Guess a number between 1 and 5');
        prompt.get(['userGuess'], function (err, result) {
                gameData.user.guess = result.userGuess;
                //console.log(gameData.user.guess)

                gameData.zombie.guess = parseInt(Math.floor(Math.random() * 5) + 1);

                gameData.zombie.damage = parseInt(Math.floor(Math.random() * 5) + 1);
                gameData.user.damage = parseInt(Math.floor(Math.random() * 5) + 1)

                //console.log(gameData.zombie.damage)

                if(result.userGuess === gameData.zombie.guess){
                         // decrease zombie health by user.damage
                        gameData.zombie.damage -= gameData.user.damage;
                        console.log(`\nYou hit the zombie with ${gameData.user.damage} damage.`)
                        console.log(`Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}.\n`)
                } else {
                        gameData.user.health -= gameData.zombie.damage;
                        console.log(`\nThe zombie slashed you with ${gameData.zombie.damage} damage.`)
                        console.log(`Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}.\n`)
                }

                checkResults();
                //check overall health after each round
        });

}

gameRound();
