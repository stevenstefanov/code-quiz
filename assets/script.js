// Assigning variables to HTML elements
var startButtonEl = document.getElementById("button");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");
var timerEl = document.getElementById("timer");
var correctFalse = document.getElementById("correct-false");
var highScoreEl = document.getElementById("highschore");
var body = document.getElementById("body");
var playerName = document.getElementById("name");

// Defining global variables
var currentScore = 0;
var highScore = 0;
var leaderboard = [];
var timer = 10;
var countTime;
var questionOrder = 0;

// push start button to begin game
buttonEl.addEventListener("click", beginGame);

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

// Start the game by pressing start button
function beginGame() {
    startButtonEl.disabled = true;
    countTime = 10;
    timerEl.textContent = countTime;
    askQuestion();
    beginTimer();
};

// Timer function
function beginTimer() {
    // hide start button - startButtonEl.setAttribute("class")
    timer = intervals(function() {
        countTime--;
        timerEl.textContent = countTime;
        if (countTime <= 0 || questionOrder == questions.lengh) {
            correctFalse.textContent = "Correct!";
            if (questionOrder < questions.length) {
                var ask = document.getElementById("ask");
                var buttonOne = document.getElementById("button1");
                var buttonTwo = document.getElementById("button2");
                var buttonThree = document.getElementById("button3");
                var buttonFour = document.getElementById("button4");
                questionsEl.removeChild(ask);
                answersEl.removeChild(buttonOne);
                answersEl.removeChild(buttonTwo);
                answersEl.removeChild(buttonThree);
                answersEl.removeChild(buttonFour);
            }
            clearInterval(timer);
            countTime = 0;
            timerEl.textContent = countTime;
            gameEnd();
        }
    }, 1000);
};

// Function to begin showing questions

function showQuestion() {
    setTimeout(function() {
        correctFalse.textContent("Correct");
    }, 500);
    var question = questions[questionOrder];
    var ask = document.createElement("span");
    ask.textContent = questions[questionOrder].prompt;
    ask.id = "ask";
    questionsEl.appendChild(ask);
    for (i = 0; i < question.choices.length; i++) {
        var choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = "button" + (i + 1);
        choice.value = i;
        answersEl.appendChild(choice);
    }
    var buttonOne = document.getElementById("button1");
    var buttonTwo = document.getElementById("button2");
    var buttonThree = document.getElementById("button3");
    var buttonFour = document.getElementById("button4");
    buttonOne.addEventListener('click', checkAnswer);
    buttonTwo.addEventListener('click', checkAnswer);
    buttonThree.addEventListener('click', checkAnswer);
    buttonFour.addEventListener('click', checkAnswer);
};

function checkAnswer() {
    var ask = document.getElementById("ask");
    var question = questions[questionOrder];
    var buttonOne = document.getElementById("button1");
    var buttonTwo = document.getElementById("button2");
    var buttonThree = document.getElementById("button3");
    var buttonFour = document.getElementById("button4");

    if (this.value == question.correct) {
        correctFalse.textContent("Correct");
        currentScore++;
        questionOrder++;
        questionsEl.removeChild(ask);
        answersEl.removeChild(buttonOne);
        answersEl.removeChild(buttonTwo);
        answersEl.removeChild(buttonThree);
        answersEl.removeChild(buttonFour);
        if (questionOrder < questions.length){
            showQuestion();
        }
    } else {
        correctFalse.textContent("Wrong");
        countTime -= 3;
        setTimeout(function() {
            correctFalse.textContent("Wrong");
        }, 500);
    }
};

function gameEnd() {
    var target = document.getElementById('name');
    var form = document.createElement('form');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Please enter your name: ";
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";
    target.appendChild(form);
    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(field);
    target.appendChild(submit);
    submit.addEventListener("click", saveName);
};

function saveName(event) {
    event.preventDefault();
    var playerName = player.value.trim();

    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreEl.textContent = playerName + ", " + currentScore;
    }

    var user = {
        name: playerName,
        score: score,
    }
    leaderboard.push(user);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
   
    var target = document.getElementById('name');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    buildLeaderboard();



//questions 1 appears
// timer starts
// 