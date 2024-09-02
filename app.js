const questions = [
  {
    question: "Which one is the largest Animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephanet", correct: false },
      { text: "Giragge", correct: false },
    ],
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Istanbul", correct: false },
      { text: "Tokyo", correct: false },
      { text: "Akra", correct: false },
      { text: "Hong Kong", correct: true },
    ],
  },
  {
    question: "_______ country is the greatest have economy in the Africa",
    answers: [
      { text: "Angol", correct: false },
      { text: "Ethiopia", correct: false },
      { text: "Egypt", correct: true },
      { text: "None of them", correct: false },
    ],
  },
  {
    question: "Who is the fundet of Alibab express?",
    answers: [
      { text: "Jack Ma", correct: true },
      { text: "Bill getes", correct: false },
      { text: "Ezadin Kamal", correct: false },
      { text: "Elon Musk", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0; //to reset always
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resertState();
  //display Question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  //display answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = answer.text;
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resertState() {
  nextButton.style.display = "none";
  //remove all previous answers
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectdBtn = e.target;
  const isCorrect = selectdBtn.dataset.correct === "true";
  if (isCorrect) {
    selectdBtn.classList.add("correct");
    score++; //count correct numbers to calculate grade
  } else {
    selectdBtn.classList.add("incorrect");
  }

  //demo for answer-button colors and display next-button
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true"; /*we can't click two answer at a time*/
  });
  nextButton.style.display = "block";
}

function showScore() {
  resertState();
  questionElement.innerHTML = `you scored ${score} / ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextElement() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextElement();
  } else {
    startQuiz();
  }
});

startQuiz(); //intial point is here
