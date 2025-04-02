const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
    },
    {
      question: "What is 5 - 2?",
      options: ["3", "4", "5", "6"],
      correct: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  function startQuiz() {
    questions.sort(() => Math.random() - 0.5);
    nextQuestion();
  }
  
  function nextQuestion() {
    clearTimeout(timer);
    if (currentQuestionIndex >= questions.length) {
      showResult();
      return;
    }
  
    const currentQuestions = questions[currentQuestionIndex];
  
    document.getElementById("Question").textContent = currentQuestions.question;
  
    const answersContainer = document.getElementById("options");
    (answersContainer.innerHTML = ""),
      currentQuestions.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.onclick = () => checkAnswer(index);
  
        answersContainer.appendChild(button);
      });
  
    startTimer();
  }
  
  function checkAnswer(answerIndex) {
    clearInterval(timer);
  
    if (answerIndex === questions[currentQuestionIndex].correct) {
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;
    }
    nextQuestion()
  
  }
  
  function newQuestion() {
      currentQuestionIndex++
      nextQuestion()
  }
  
  function showResult() {
    document.getElementById("quiz-container").classList.add("Result");
    document.getElementById("result").classList.remove("Result");
    document.getElementById(  "final-score" ).textContent = `Final score: ${score}/${questions.length}`;
  }
  
  function startTimer() {
    let timeLeft = 10;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    console.log(timeLeft, 11);
  
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        newQuestion();
      }
    }, 1000);
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = `Score: 0`;
  
    document.getElementById("quiz-container").classList.remove("Result");
    document.getElementById("result").classList.add("Result");
    startQuiz();
  }
  
  // document.getElementById("restartQuiz").addEventListener("click", () => {
  //   restartQuiz();
  // });
  startQuiz();