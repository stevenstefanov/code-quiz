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
    for (i = 0; i < question.choices.length; i++);
    var choice = document.createElement('button');
        choice.textContent = question.choices[i];
        choice.id = "button" + (i + 1);
        choice.value = i;
        answersEl.appendChild(choice);
}



//questions 1 appears
// timer starts
// 