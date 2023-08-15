import "./style.scss";
import { Questions } from "./questions";

// all of the query selectors for the elements that have been called
const startButton = document.querySelector(
  ".game-menu__start-button"
) as HTMLButtonElement;
const nextButton = document.querySelector(
  ".container__next-question"
) as HTMLButtonElement;
const questionContainer = document.querySelector(
  ".container__questions"
) as HTMLHeadingElement;
const answerButtons = document.querySelectorAll(
  ".container__answer"
) as NodeListOf<HTMLButtonElement>;
const scoreDisplay = document.querySelector(
  ".game-menu__score"
) as HTMLDivElement;
const restartButton = document.querySelector(
  ".game-menu__restart"
) as HTMLButtonElement;

// if statement to check that the
if (
  !startButton ||
  !nextButton ||
  !questionContainer ||
  !answerButtons ||
  !scoreDisplay ||
  !restartButton
) {
  throw new Error("Issues with the selectors...");
}

// variables for the current question and the score counter
let currentQuestionIndex = 0;
let score = 20;

/*

showQuestion function
question = Questions index
set question container's html to the question from questions object

for each function for the answer buttons 
answer = question objects's answer index
set the buttons text to 1. answer so it's laid out nicely
remove correct and incorrect classed from the button

*/

const showQuestion = (i: number) => {
  const question = Questions[i];
  questionContainer.innerHTML = question.question;
  console.log(showQuestion);

  answerButtons.forEach((button, i) => {
    const answer = question.answer[i];
    button.textContent = `${i + 1}. ${answer.answer}`;
    button.classList.remove("correct", "incorrect");
  });
};

/* 

use a for each function on the button in answerButtons,
add an event listener for the button click
when you click it - find the index in the answerButtons
get the right answer object from questions object
store the clicked answer in a variable 

if statement:
if the selected answer is true
minus the score by 1 because the aim is to get to P1.
update the score display

*/
answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedAnswer =
      Questions[currentQuestionIndex].answer[
        Array.from(answerButtons).indexOf(button)
      ];
    console.log(selectedAnswer);

    if (selectedAnswer.correct) {
      score--;
      scoreDisplay.textContent = `Score - P:${score}`;
      button.classList.add("correct");
      button.classList.remove("incorrect");
    } else {
      button.classList.add("incorrect");
      button.classList.remove("correct");
    }
  });
});

/* 

need a function for the next question 
use an if/else statement with the currentQuestionIndex

*/
const showNextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < Questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showThankYouMessage();
  }
};

const shuffleQuestions = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
};

shuffleQuestions(Questions);

/*

create a function to restart game
set the currentQuestion index back to 0
set the score back to 20
call on the showQuestion function 
make the buttons show up again

*/
const restartGame = () => {
  currentQuestionIndex = 0;
  score = 20;
  showQuestion(currentQuestionIndex);
  scoreDisplay.textContent = `Score - P:${score}`;
  nextButton.style.display = "flex";

  answerButtons.forEach((button) => {
    button.style.display = "flex";
  });
};

const showThankYouMessage = () => {
  const thankYouHeading = document.createElement("h1");
  thankYouHeading.innerHTML = `Thank you for playing the F1 quiz! It was a tough race but we finished the day at P${score} we'll try again next week.`;

  thankYouHeading.classList.add("thankyou-message");
  questionContainer.innerHTML = "";
  questionContainer.appendChild(thankYouHeading);
  answerButtons.forEach((button) => (button.style.display = "none"));
  nextButton.style.display = "none";
};

// next button displayed as none
nextButton.style.display = "none";

// event listeners
// added the next button back into the html
startButton.addEventListener("click", () => {
  showQuestion(currentQuestionIndex);
  answerButtons.forEach((button) => (button.style.display = "block"));
  scoreDisplay.textContent = `Score - P:${score}`;
  startButton.style.display = "none";
  nextButton.style.display = "flex";
});

nextButton.addEventListener("click", () => {
  showNextQuestion();
});

restartButton.addEventListener("click", () => {
  restartGame();
});
