import './tailwind.css';
import './darkmode.ts';
import axios from 'axios';

function getQuiz() {
  axios
    .get(
      'https://raw.githubusercontent.com/Aref-Akminasi/quizify-json/main/quiz.json'
    )
    .then((res: any) => console.log(res.data.quiz[1]))
    .catch((err: any) => console.log(err));
}

getQuiz();
