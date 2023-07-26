// alert("works");
buttonColors = ["red", "blue","green","yellow"];
gamePattern =[];
userClickedPattern =[];
var level = 0;
var started = false;

$(document).keydown(function(){
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();
        started= true;
    }
});

$(".btn").click( function() {
    var userChosenColour = this.id;
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    makeSound(userChosenColour);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
        },1000);
        }
    } else{
        console.log("Failure");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function nextSequence(){
    userClickedPattern =[];
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber = Math.round(Math.random()*3);
    // console.log(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    
    $("#"+randomChosenColour).fadeOut(100);
    $("#"+randomChosenColour).fadeIn(100);
    makeSound(randomChosenColour);
};




function makeSound(key){
    switch (key) {
        case "red": var red = new Audio("./sounds/red.mp3");
                red.play();
                break;
        case "blue": var blue = new Audio("./sounds/blue.mp3");
                blue.play();
                break;
        case "green": var green = new Audio("./sounds/green.mp3");
                green.play();
                break;
        case "yellow": var yellow = new Audio("./sounds/yellow.mp3");
                yellow.play();
                break;

        default: console.log(key);
                 break;
    }

};

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout( function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function startOver(){
    level=0;
    gamePattern=[];
    started= false;
}

