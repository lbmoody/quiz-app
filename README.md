# quiz-app
Front end quiz application that uses javascript to serve up questions and test the users knowledge on a subject.

## app-link
Launch FrontEnd Quiz Challenge [Here](https://lbmoody.github.io/quiz-app/)

## usage
Choose between 1 of the 3 quizzes: HTML, Javascript, or CSS. The application will then take you to the first question of the quiz, which is randomly chosen from the array of questions. You will also notice a progress bar counting down to zero. The length of the progress bar is calculated based on the length of the quiz, 6 seconds per question in the quiz. Each question you answer correctly will add 1 to your score multiplier, however each incorrect question will subtract 1 from your score multiplier. If you run out of time while completing the quiz you will be forced to restart. On quiz completion you will have the opportunity to enter your score. The score is calculated by multiplying your remaining time on the quiz against your score multiplier.