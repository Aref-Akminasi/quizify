// Imports
import './tailwind.css';
import './darkmode.ts';
import axios from 'axios';

// Constants
const questionInterval: number = 1500;
const cRadius: number = 602.88;

// Types
type Question = {
  q: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
};

// State Variables
let preTime = 0;
let questions: Question[] = [];
let currentQuestion = 0;
let answeredCorrect = 0;
let totalQuestions: number;

// DOM Elements: Divs
const questionElement = document.getElementById('question') as HTMLDivElement;
const quiz = document.getElementById('quiz') as HTMLDivElement;
const score = document.getElementById('score') as HTMLDivElement;
const quizScore = document.getElementById('quiz-score') as HTMLDivElement;
const scorePrecentage = document.getElementById(
  'score-precentage'
) as HTMLDivElement;
const progressBar = document.getElementById('progress') as HTMLDivElement;
const progress = document.querySelector('.progress') as HTMLDivElement;

// DOM Elements: Lists
const options = document.querySelectorAll('.op');
const optionsRec = document.querySelectorAll('.opr')!;

// DOM Elements: Buttons
const tryAgain = document.getElementById('try-again') as HTMLButtonElement;

// Function to fetch quiz data
function getQuiz(): void {
  axios
    .get(
      'https://raw.githubusercontent.com/Aref-Akminasi/quizify-json/main/quiz.json'
    )
    .then((res: any) => {
      questions = res.data.quiz;
      totalQuestions = questions.length;
      progress.innerHTML = `${currentQuestion + 1} / ${totalQuestions}`;
      askQuestion();
    })
    .catch((err: any) => console.log(err));
}

// Initial function call to get quiz data
getQuiz();

// Function to populate the question and options
function askQuestion(): void {
  reset();
  progress.innerHTML = `${currentQuestion + 1} / ${totalQuestions}`;
  questionElement.innerText = questions[currentQuestion].q;
  options[0].innerHTML = questions[currentQuestion].a;
  options[1].innerHTML = questions[currentQuestion].b;
  options[2].innerHTML = questions[currentQuestion].c;
  options[3].innerHTML = questions[currentQuestion].d;
}

// Event Listeners for Options
optionsRec.forEach((r) =>
  r.addEventListener('click', () => {
    checkAnswer(r);
  })
);

// Function to check the answer and update the state
function checkAnswer(r: any): void {
  // Get the current time
  const date = new Date();
  const currentTime = date.getTime();
  // Ensure sufficient time has passed since the last click
  if (currentTime - preTime > questionInterval) {
    // Update previous time
    preTime = currentTime;

    // Get correct answer for the current question
    const correctAnswer = questions[currentQuestion].correct;

    // Get the clicked rectangle's first letter and make it lowercase
    const clickedRec = r.firstElementChild.innerText[0].toLowerCase();

    // Check if the clicked rectangle is the correct answer
    if (correctAnswer === clickedRec) {
      // Increment the correct answer count
      answeredCorrect++;

      // Reveal the correct answer indicator
      r.children[1].classList.remove('hidden');
    } else {
      // Reveal the incorrect answer indicator
      r.children[2].classList.remove('hidden');

      // Determine the correct answer's position in the options
      const answersArr = ['a', 'b', 'c', 'd'];

      // Reveal the correct answer indicator for the correct option
      optionsRec[
        answersArr.indexOf(correctAnswer)
      ].children[1].classList.remove('hidden');
    }

    // Move to the next question or end the quiz
    if (currentQuestion !== totalQuestions - 1) {
      // Set a delay before moving to the next question
      setTimeout(() => {
        currentQuestion++;
        askQuestion();
      }, questionInterval);
    } else {
      // Set a delay before ending the quiz
      setTimeout(gameOver, questionInterval);
    }
  }
}

// Function to reset the correct/incorrect display
function reset(): void {
  optionsRec.forEach((r) => {
    r.children[1].classList.add('hidden');
    r.children[2].classList.add('hidden');
  });
}

// Function to handle game over scenario
function gameOver(): void {
  // Hide the quiz container
  quiz.classList.add('hidden');

  // Show the score container
  score.classList.remove('hidden');

  // Display the total score (correct answers out of total questions)
  quizScore.innerHTML = `${answeredCorrect}/${totalQuestions}`;

  // Calculate and display the percentage of correct answers
  const precentage = Math.floor((answeredCorrect / totalQuestions) * 100);
  scorePrecentage.innerHTML = `${precentage}%`;

  // Update the progress bar to reflect the score percentage
  progressBar.style.strokeDashoffset = `${
    cRadius - (cRadius * precentage) / 100
  }`;
}

// Event Listener for Try Again button
tryAgain.addEventListener('click', () => {
  location.reload();
});
