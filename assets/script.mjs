import { htmlQuizTitle }       from "./quizzes/htmlQuiz.mjs";
import { htmlQuiz }       from "./quizzes/htmlQuiz.mjs";
import { cssQuizTitle }        from "./quizzes/cssQuiz.mjs";
import { cssQuiz }        from "./quizzes/cssQuiz.mjs";
import { javascriptQuizTitle } from "./quizzes/javascriptQuiz.mjs";
import { javascriptQuiz } from "./quizzes/javascriptQuiz.mjs";

// create multiple quizzes, and create cards to select the quiz based on the quiz index in quizzes array
// serve quiz questions to the user in a random order

// order quiz answers for each question in a random order

// add countdown timer for the entire quiz
    // end score is the amount of time left when quiz is finished
    // incorrect answers remove 10 sec from timer
    // if the user runs out of time the quiz ends
    // BONUS: add a bar that counts down too. Starts green, turns yellow at 50% time left, and red at 10-15%

// create highscore page and store scores in local storage?

// bonus create multiple quizes that can populate automatically based on url?


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

var landing = document.getElementById("landing");
var timeLeftEl = document.getElementById("timeLeft");
var quizSelectEl = document.getElementById("quiz-select");

var qID = 0;


function setTimer(qID) {
    var timeLeft = quizzes[qID].length * 5;
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

quizzes.forEach(function(quiz){
    var quizCard = document.createElement("button");
    var index = quizzes.indexOf(quiz);
    quizCard.id = index;
    quizCard.textContent = `${quizTitles[index]} Quiz`;
    quizCard.setAttribute("type", "button");
    quizCard.setAttribute("class", "btn btn-outline-secondary m-2 p-4");
    quizSelectEl.appendChild(quizCard);
})


quizSelectEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.type === "button"){
        landing.style.display = "none";
        qID = parseInt(event.target.id);
        setTimer(qID);
        console.log(quizzes[qID]);
        
    }
})


