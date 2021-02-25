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
        question: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "How To Make Lemonade", "Hit The Metal Lane", "Have The Misters Left"],
        answer: "0",
    },
    {
        question: "Are JavaScript and Java the same thing?",
        choices: ["Yes", "No", "Maybe", "Probably"],
        answer: "1",
    },
    {
        question: "What does DRY stand for?",
        choices: ["Different Rhythms Yearly", "Da Royal Yacht", "Don't Repeat Yourself", "Dusty Rusty Yarn"],
        answer: "2";
    },
    {
        question: "Why is it a good idea to become a web developer?",
        choices: ["You will constantly learn new things", "It pays well", "Possibility to work from home", "All of the above"],
        answer: "3";
    },
]

// Start the game by pressing start button
function beginGame() {
    startButtonEl.disabled = true;
    timerEl.textContent = timer;
    beginTimer();
    askQuestion();
};



//questions 1 appears
// timer starts
// 