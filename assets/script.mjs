import { htmlQuizTitle }       from "./quizzes/htmlQuiz.mjs";
import { htmlQuiz }       from "./quizzes/htmlQuiz.mjs";
import { cssQuizTitle }        from "./quizzes/cssQuiz.mjs";
import { cssQuiz }        from "./quizzes/cssQuiz.mjs";
import { javascriptQuizTitle } from "./quizzes/javascriptQuiz.mjs";
import { javascriptQuiz } from "./quizzes/javascriptQuiz.mjs";

// serve quiz questions to the user in a random order

// order quiz answers for each question in a random order

// add countdown timer for the entire quiz
    // end score is the amount of time left when quiz is finished
    // incorrect answers remove 10 sec from timer
    // if the user runs out of time the quiz ends
    // BONUS: add a bar that counts down too. Starts green, turns yellow at 50% time left, and red at 10-15%

// create highscore page and store scores in local storage?

// bonus create multiple quizes that can populate automatically based on url?

var DEBUG = true;


var quizzes = [
      htmlQuiz
    , cssQuiz
    , javascriptQuiz
];

var quizTitles = [
      htmlQuizTitle
    , cssQuizTitle
    , javascriptQuizTitle
];

var landingSection = document.getElementById("landing");
// var quizSection = document.getElementById("quiz");
var timeLeftEl = document.getElementById("timeLeft");
var quizSelectEl = document.getElementById("quizSelect");
var quizTitleEl = document.getElementById("quizTitle");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");

// set quizID
var quizID = 0;


function quizzer(quizID) {
    var timeLeft = quizzes[quizID].length * 5;
    var quizArray = quizzes[quizID];
    quizTitleEl.textContent = `${quizTitles[quizID]} Quiz`;

    if (DEBUG) console.log(quizArray);

    askQuestion(quizID);
    var quizInterval = setInterval(function() {
        timeLeftEl.textContent = `${timeLeft} seconds left`;
        timeLeft--;
        
        if (timeLeft === 0) {
            clearInterval(quizInterval);
            // this would populate the pop-up with the high scores
        }
        return timeLeft;
    }, 1000)
}


// function to ask random question to the user
function askQuestion(quizID) {
    var questions = quizzes[quizID].filter( function (question) {
        return question.asked === false;
    })

    
    if (questions.length > 0) {
        var newQuestion = questions[Math.floor((questions.length) * Math.random())];

        if (DEBUG) console.log(newQuestion);

        questionEl.textContent = newQuestion.question;

        orderOptions(newQuestion);

    } else {
        
        return false;
    }
}

function orderOptions (newQuestion) {
    console.log(newQuestion.options);
    newQuestion.options.forEach(function(option){
        var optionButton = document.createElement("button");
        var index = newQuestion.options.indexOf(option);
        optionButton.id = index;
        optionButton.setAttribute("type", "button");
        optionButton.setAttribute("class", "btn btn-secondary m-2");
        optionButton.textContent = option;
        optionsEl.appendChild(optionButton);
    })

}

quizzes.forEach(function(quiz){
    var quizButton = document.createElement("button");
    var index = quizzes.indexOf(quiz);
    quizButton.id = index;
    quizButton.textContent = `${quizTitles[index]} Quiz`;
    quizButton.setAttribute("type", "button");
    quizButton.setAttribute("class", "btn btn-outline-secondary m-2 p-4");
    quizSelectEl.appendChild(quizButton);
})


quizSelectEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.type === "button"){
        landingSection.style.display = "none";
        quizID = parseInt(event.target.id);
        quizzer(quizID);       
    }
})


