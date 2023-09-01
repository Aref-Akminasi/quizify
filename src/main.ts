import './tailwind.css';
import './darkmode.ts';
import axios from 'axios';
const questionElement = document.getElementById('question')!;
const options = document.querySelectorAll('.op')!;
const optionsRec = document.querySelectorAll('.opr')!;
const progress = document.querySelector('.progress')!;
let questions: any[] = [];
let currentQuestion = 0;
let answeredCorrect = 0;
let totalQuestions: number;

function getQuiz() {
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

function askQuestion() {
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
  const correctAnswer = questions[currentQuestion].correct;
  const clickedRec = r.firstElementChild.innerText[0].toLowerCase();
  if (correctAnswer === clickedRec) {
    answeredCorrect++;
  }
  if (currentQuestion != totalQuestions - 1) {
    currentQuestion++;
    askQuestion();
  } else {
    alert(`Game over, your score is: ${answeredCorrect}/${totalQuestions}`);
  }
  progress.innerHTML = `${currentQuestion + 1} / ${totalQuestions}`;
}
