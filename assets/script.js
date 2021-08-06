// Assigning variables to HTML elements
var startButtonEl = document.getElementById("start");
var questionEl = document.getElementById("question");
var currentScoreEl = document.getElementById("score");
var answersEl = document.getElementById("answers");
var timerEl = document.getElementById("countTime");
var correctText = document.getElementById("correctText");
var wrongText = document.getElementById("wrongText");
var highScoreEl = document.getElementById("highScore");
var body = document.getElementById("body");
var playerName = document.getElementById("playerName");

// Defining global variables
var score = 0;
var highScore = 0;
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
var timer;
var countTime;
var questionOrder = 0;
var ask;
var buttonOne;
var buttonTwo;
var buttonThree;
var buttonFour;
var answers;
var question;
var playButton;

// Push start button to begin game
startButtonEl.addEventListener("click", beginGame);

//List of questions
var questions = [
    {
        prompt: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "How To Make Lemonade", "Hit The Metal Lane", "Have The Misters Left"],
        answer: "0",
    },
    {
        prompt: "Are JavaScript and Java the same thing?",
        choices: ["Yes", "No", "Maybe", "Probably"],
        answer: "1",
    },
    {
        prompt: "What does DRY stand for?",
        choices: ["Different Rhythms Yearly", "Da Royal Yacht", "Don't Repeat Yourself", "Dusty Rusty Yarn"],
        answer: "2",
    },
    {
        prompt: "Why is it a good idea to become a web developer?",
        choices: ["You will constantly learn new things", "It pays well", "Possibility to work from home", "All of the above"],
        answer: "3",
    },
]

// Initialize
init();

function init() {
    returnHighscore();
}

// Returns the current highscore
function returnHighscore() {
    if (JSON.parse(localStorage.getItem("leaderboard"))) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
        leaderboard.sort((a, b) => b.score - a.score);
        for (var i = 0; i < 1; i++) {
            highScoreEl.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        }
    }
};

// Function to begin the game
function beginGame() {
    startButtonEl.disabled = true;
    beginTimer();
    cueQuestion();
};

// Starts the timer and sets the trigger for the end of the game
function beginTimer() {
    startButtonEl.setAttribute("class", "d-none");
    countTime = 50;
    timerEl.textContent = countTime;
    timer = setInterval(function() {
      countTime--;
      timerEl.textContent = countTime;
      // If time is out, clear out the question and choices and end the game
      if (countTime <= 0 || questionOrder == questions.length) {
        correctText.setAttribute("id", "correctText");
        if (questionOrder < questions.length) {
            questionEl.removeChild(ask);
            target = answersEl;
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }
        clearInterval(timer);
        countTime = 0;
        timerEl.textContent = countTime;
        endGame();
      }
    }, 1000);
};

// Ask the questions
function cueQuestion() {
    setTimeout(function() { correctText.setAttribute("id", "correctText"); },1500);
    question = questions[questionOrder];
    ask = document.createElement('span');
    ask.setAttribute("class", "mt-4");
    ask.textContent = questions[questionOrder].prompt;
    ask.id = "ask";
    questionEl.appendChild(ask);
    for (var i = 0; i < question.choices.length; i++) {
        choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = "button" + (i + 1);
        choice.value = i;
        choice.setAttribute("class", "btn-sm btn-primary px-2 mx-2 mt-1");
        answersEl.appendChild(choice);
    }
    // Event listeners for answer buttons
    buttonOne = document.querySelector("#button1");
    buttonTwo = document.querySelector("#button2");
    buttonThree = document.querySelector("#button3");
    buttonFour = document.querySelector("#button4");
    buttonOne.addEventListener('click', answerCheck);
    buttonTwo.addEventListener('click', answerCheck);
    buttonThree.addEventListener('click', answerCheck);
    buttonFour.addEventListener('click', answerCheck);
};

// Check if the answer is correct/incorrect  
function answerCheck() {
    if (this.value == question.answer) {
        correctText.setAttribute("id", "correctText.show");
        score++;
        currentScoreEl.textContent = score;
        questionOrder++;
        questionEl.removeChild(ask);
        answersEl.removeChild(buttonOne);
        answersEl.removeChild(buttonTwo);
        answersEl.removeChild(buttonThree);
        answersEl.removeChild(buttonFour);
        if (questionOrder < questions.length){
            cueQuestion();
        }
    } else {
        wrongText.setAttribute("id", "wrongText.show");
        countTime -= 3;
        setTimeout(function() { wrongText.setAttribute("id", "wrongText"); }, 500);
    }
};

// Ends game and submits name
function endGame() {
    var target = document.querySelector('#playerName');
    var form = document.createElement('form');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    label.setAttribute("class", "mr-2")
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";
    submit.setAttribute("class", "btn-sm btn-success px-4 mt-2");
    field.setAttribute("class", "form-control");
    div.setAttribute("class", "form-inline");
    target.appendChild(form);
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(field);
    target.appendChild(submit);
    submit.addEventListener("click", savePlayerName);
};

// Saves player's name if highscore is new
function savePlayerName(event) {
    event.preventDefault();
    var playerName = player.value.trim();
    var user = {
        name: playerName,
        score: score,
    }
    leaderboard.push(user);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    var target = document.querySelector('#playerName');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    createLeaderboard();
};

// Create leaderboard
function createLeaderboard() {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    leaderboard.sort((a, b) => b.score - a.score);
    var leader = document.createElement('ol');
    leader.setAttribute("class", "text-left");
    questionEl.appendChild(leader);
    for (var i = 0; (i < leaderboard.length) && (i <4); i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        list.style = "font-size: .7em";
        leader.appendChild(list);
    }
    // Create "Try Again?" button
    var play = document.createElement('button');
    play.id = "play"
    play.textContent = "Try Again?"
    playButton = document.querySelector("#tryAgain")
    playButton.appendChild(play);
    play.setAttribute("class", "btn btn-primary px-4");
    play.addEventListener("click", tryAgain);
};

// Offer user a chance to play again and call functions to reset game to pre-start status
function tryAgain() {
    startButtonEl.disabled = false;
    startButtonEl.setAttribute("class", "btn btn-primary px-4 mt-5");
    playButton.removeChild(play);
    var target = document.querySelector('#question');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    questionOrder = 0;
    countTime = 0;
    score = 0;
    timerEl.textContent = countTime;
    returnHighscore();
};