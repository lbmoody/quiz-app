import { jQuiz } from "./quizzes/javascriptQuiz.mjs";
import { textQuiz } from "./quizzes/secondQuiz.mjs";

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


var quizzes = [{ jQuiz }, { textQuiz}];

var timeLeftEl = document.getElementById("timeLeft");
var quizSelectEl = document.getElementById("quiz-select");


quizzes.forEach(function(quiz){
    var quizCard = document.createElement("div");
    quizCard.id = quizzes.indexOf(quiz);
    quizCard.textContent = `Quiz ${quizCard.id}`;
    quizCard.setAttribute("class", "card m-2 p-5");
    quizSelectEl.appendChild(quizCard);
})

var timeLeft = quizzes[0].jQuiz.length * 5;

function setTimer() {
    var timerInterval = setInterval(function() {
        timeLeftEl.textContent = `${timeLeft} seconds left`;
        timeLeft--;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            // this would populate the pop-up with the high scores
        }
    }, 1000)
}

setTimer();

