import './tailwind.css';
import './darkmode.ts';
import axios from 'axios';
const questionElement = document.getElementById('question')!;
const options = document.querySelectorAll('.op')!;
const optionsRec = document.querySelectorAll('.opr')!;
const progress = document.querySelector('.progress')!;
const quiz = document.getElementById('quiz')!;
const score = document.getElementById('score')!;
const quizScore = document.getElementById('quiz-score')!;
const scorePrecentage = document.getElementById('score-precentage')!;
const tryAgain = document.getElementById('try-again')!;
const progressBar = document.getElementById('progress')!;
const questionInterval = 1500;
const date = new Date();

let preTime = date.getTime();
let questions: any[] = [];
let currentQuestion = 0;
let answeredCorrect = 0;
let totalQuestions: number;

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

getQuiz();

function askQuestion(): void {
  reset();
  progress.innerHTML = `${currentQuestion + 1} / ${totalQuestions}`;
  questionElement.innerText = questions[currentQuestion].q;
  options[0].innerHTML = questions[currentQuestion].a;
  options[1].innerHTML = questions[currentQuestion].b;
  options[2].innerHTML = questions[currentQuestion].c;
  options[3].innerHTML = questions[currentQuestion].d;
}

optionsRec.forEach((r) =>
  r.addEventListener('click', () => {
    checkAnswer(r);
  })
);

function checkAnswer(r: any): void {
  const date = new Date();
  const currentTime = date.getTime();
  if (currentTime - preTime > questionInterval) {
    preTime = currentTime;
    const correctAnswer = questions[currentQuestion].correct;
    const clickedRec = r.firstElementChild.innerText[0].toLowerCase();
    if (correctAnswer === clickedRec) {
      answeredCorrect++;
      r.children[1].classList.remove('hidden');
    } else {
      r.children[2].classList.remove('hidden');
      const answersArr = ['a', 'b', 'c', 'd'];
      optionsRec[
        answersArr.indexOf(correctAnswer)
      ].children[1].classList.remove('hidden');
    }
    if (currentQuestion != totalQuestions - 1) {
      setTimeout(() => {
        currentQuestion++;
        askQuestion();
      }, questionInterval);
    } else {
      setTimeout(gameOver, questionInterval);
    }
  }
}

function reset(): void {
  optionsRec.forEach((r) => {
    r.children[1].classList.add('hidden');
    r.children[2].classList.add('hidden');
  });
}

function gameOver(): void {
  quiz.classList.add('hidden');
  score.classList.remove('hidden');
  quizScore.innerHTML = `${answeredCorrect}/${totalQuestions}`;
  const precentage = Math.floor((answeredCorrect / totalQuestions) * 100);
  scorePrecentage.innerHTML = `${precentage}%`;
  progressBar.style.strokeDashoffset = `${
    602.88 - (602.88 * precentage) / 100
  }`;
}

tryAgain.addEventListener('click', () => {
  location.reload();
});
