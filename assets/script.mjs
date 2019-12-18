import { htmlQuizTitle }       from "./quizzes/htmlQuiz.mjs";
import { htmlQuiz }            from "./quizzes/htmlQuiz.mjs";
import { cssQuizTitle }        from "./quizzes/cssQuiz.mjs";
import { cssQuiz }             from "./quizzes/cssQuiz.mjs";
import { javascriptQuizTitle } from "./quizzes/javascriptQuiz.mjs";
import { javascriptQuiz }      from "./quizzes/javascriptQuiz.mjs";

// create highscore functionality

// create highscore page and store scores in local storage?

// for testing
var DEBUG = true;

// array for the quizzes
var quizzes = [
      htmlQuiz
      , javascriptQuiz
    , cssQuiz
];

// array of quiz titles
var quizTitles = [
      htmlQuizTitle
      , javascriptQuizTitle
    , cssQuizTitle
];

var highscores = [];

var landingSection = document.getElementById("landing");
var quizSection =    document.getElementById("quiz");
var progressBar =    document.getElementById("progressBar");
var quizSelectEl =   document.getElementById("quizSelect");
var quizTitleEl =    document.getElementById("quizTitle");
var questionEl =     document.getElementById("question");
var optionsEl =      document.getElementById("options");
var userScoreEl =    document.getElementById("userScore");
var userNameEl =     document.getElementById("userName");
var userQuizEl =     document.getElementById("userQuiz");
var clearScores =    document.getElementById("clearHighScores")
var resetButton =    document.getElementById("reset");

var quizID = 0;
var timeLeft = quizzes[quizID].length * 5;
var points = 0;
var currentQuestion;
var progressBarEl = document.createElement("div");
var multiplierEl = document.createElement("h3");

loadHighscores();

function quizzer() {
    currentQuestion = selectQuestion(quizID);
    if (currentQuestion) {
        askQuestion(currentQuestion);
        orderOptions(currentQuestion);        
    } else {
        // Add functionality for end of game
        enterHighscore();
        storeHighscore();
        location.reload();
    }
}


// function to ask random question to the user
function selectQuestion() {
    var questions = quizzes[quizID].filter( function (question) {
        return question.asked === false;
    })

    if (DEBUG) console.log(`${questions.length} questions not asked`);
    
    if (questions.length > 0) {
        return questions[Math.floor((questions.length) * Math.random())];
    } else {
        return false;
    }
}

function askQuestion() {
    questionEl.textContent = currentQuestion.question;
}

// function to provide options to selected question
function orderOptions() {

    if (DEBUG )console.log(currentQuestion.options);

    currentQuestion.options.forEach(function(option){
        var optionButton = document.createElement("button");
        var index = currentQuestion.options.indexOf(option);
        optionButton.id = index;
        optionButton.setAttribute("type", "button");
        optionButton.setAttribute("class", "btn btn-secondary btn-lg m-2");
        optionButton.textContent = option;
        optionsEl.appendChild(optionButton);
    })

}

function removeOptions() {
    while (optionsEl.firstChild){
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function quizTimer() {
    // timeLeft = quizzes[quizID].length * 5;
    createProgressBar();
    var quizInterval = setInterval(function() {
        updateProgressBar();
        timeLeft--;


        if (timeLeft === -1) {
            clearInterval(quizInterval);
            alert("You ran out of time!\nKeep studying and try again!");
            location.reload();
        }
        return timeLeft;
    }, 1000)
}


// Creates a progress bar to show the user how much time is left to complete the quiz

function createProgressBar() {
    var progressBarParent = document.createElement("div");
    progressBarParent.setAttribute("class", "progress");
    multiplierEl.innerHTML = `Multiplier: <b>x${points}</b>`
    multiplierEl.style.textAlign = "right";
    progressBar.appendChild(multiplierEl);
    progressBar.appendChild(progressBarParent);
    progressBarEl.setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    progressBarEl.setAttribute("role", "progressbar");
    progressBarParent.appendChild(progressBarEl);
    
}

// Updates the progress bar to show how much time is left

function updateProgressBar() {
    var progressPercent = (timeLeft) / (quizzes[quizID].length * 5) * 100;
    var percent = progressPercent.toFixed(2);
    multiplierEl.innerHTML = `Multiplier: <b>x${points}</b>`
    progressBarEl.setAttribute("style", `width: ${percent}%`);
    progressBarEl.setAttribute("aria-valuenow", `${timeLeft}`);
    progressBarEl.setAttribute("aria-valuemin", "0");
    progressBarEl.setAttribute("aria-valuemax", `${quizzes[quizID].length * 5}`);

    if (percent < 66) {
        progressBarEl.setAttribute("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
    }

    if (percent < 33) {
        progressBarEl.setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
    }

}

function loadHighscores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighScores) {
        highscores = storedHighScores;
        highscores.sort();
    }

}

function enterHighscore() {
    var user = prompt("Please enter your name.\n Score: "+ timeLeft * points)
    var highscore = timeLeft * points;
    var quizTaken = quizTitles[quizID];
    var scoreEntry = {score: highscore, player: user, quiz: quizTaken}
    highscores.push(scoreEntry);

}

function storeHighscore() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}



quizzes.forEach(function(quiz) {
    var quizButton = document.createElement("button");
    var index = quizzes.indexOf(quiz);
    quizButton.id = index;
    quizButton.textContent = `${quizTitles[index]} Quiz`;
    quizButton.setAttribute("type", "button");
    quizButton.setAttribute("class", "btn btn-outline-secondary btn-lg m-2 p-4");
    quizSelectEl.appendChild(quizButton);
})


quizSelectEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.type === "button"){
        landingSection.style.display = "none";
        quizID = parseInt(event.target.id);
        var quizArray = quizzes[quizID];
        quizTitleEl.textContent = `${quizTitles[quizID]} Quiz`;

        if (DEBUG) console.log(`quizArray: ${quizArray}`);

        quizzer();
        quizTimer();
    }
})

optionsEl.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.type === "button") {
        if (event.target.textContent === currentQuestion.answer) {
            event.target.setAttribute("type", "button");
            event.target.setAttribute("class", "btn btn-success btn-lg m-2");
            points++;
        } else {
            event.target.setAttribute("type", "button");
            event.target.setAttribute("class", "btn btn-danger btn-lg m-2");
            points--;
        }
    }

    currentQuestion.asked = true;

    setTimeout(function(){
        removeOptions()
        quizzer(quizID);

    }, 1000);
})


highscores.forEach(function(highscore){
    var userScore = document.createElement("div");
    var userName = document.createElement("div");
    var userQuiz = document.createElement("div");
    userScore.textContent = highscore.score;
    userName.textContent = highscore.player;
    userQuiz.textContent = highscore.quiz;
    userScoreEl.appendChild(userScore);
    userNameEl.appendChild(userName);
    userQuizEl.appendChild(userQuiz);
})

clearScores.addEventListener("click", function (event) {
    event.preventDefault()
    localStorage.clear();
    location.reload();
})

// reset application
resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
})

