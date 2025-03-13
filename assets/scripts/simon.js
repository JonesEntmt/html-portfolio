
let buttonColours = ["red","blue","green","yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let clickCount = 0

$("#hide").hide();
$(".btn-simon").hide();

$("body").one("keypress", function () {
    $(".btn-simon").show();
    setTimeout(nextSequence, 500);
});

$(".btn-simon").on("click", function (event) {
    let userChosenColour = (event.target.id).replace("-simon","")
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    clickCount++;
    checkClick();
})

function nextSequence() {
    level++;

    $("h1").text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSequence();

}

function playSound(name) {
    let audio = new Audio(".././assets/sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour + "-simon").toggleClass("pressed");
    setTimeout(function() {
        $("." + currentColour + "-simon").toggleClass("pressed");
      }, 100);
}

function playSequence() {
    for (let i = 0; i < level; i++){
        setTimeout(function () {
        $("." + gamePattern[i] + "-simon").fadeToggle(200).fadeToggle(200);
        playSound(gamePattern[i]);
        }, 1000 * i)
    }
}

function checkClick() {
    if ((gamePattern.length == userClickedPattern.length) && (gamePattern.toString() === userClickedPattern.toString())) {
        console.log("next round!");
        userClickedPattern = [];
        clickCount = 0;
        setTimeout(nextSequence, 1000);
    } else if (gamePattern[clickCount-1] === userClickedPattern[clickCount-1]) {
        console.log("right!");
    } else {
        console.log("wrong!");
        $("#simon").attr("id","game-over")
        $("h1").text("WRONG! Refresh...");
        $(".btn-simon").hide();
        playSound("wrong");
    }
}