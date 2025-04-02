const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
  { question: "What is 7 + 2?", options: ["3", "4", "5", "9"], correct: 3 },
  { question: "What is 2 + 4?", options: ["3", "4", "5", "6"], correct: 3 },

];

let currentQuestionIndex = 0; // Which question we're on
let score = 0; // Player's score
let timer; // Holds the timer
let timeLeft = 10; // Time per

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Update question text
  document.getElementById("question").textContent = currentQuestion.question;

  // Clear previous options
  const answersContainer = document.getElementById("answers");
  answersContainer.innerHTML = "";

  // Create radio buttons for each answer
  currentQuestion.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${index}"> ${option};`
      answersContainer.appendChild(label);
      answersContainer.appendChild(document.createElement("br"));
  });

  // Reset timer
  startTimer();
}

function checkAnswer() {
  const selectedOption = document.querySelector("input[name='answer']:checked");

  if (!selectedOption) {
      alert("Please select an answer!");
      return;
  }

  const answerIndex = parseInt(selectedOption.value);
  if (answerIndex === questions[currentQuestionIndex].correct) {
      score++; // Increase score if correct
  }

  // Move to the next question or show results
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      showResults();
  }

  // Update score display
  document.getElementById("score").textContent = `Score: ${score};`
}
function showResults() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("final-score").textContent = Your `Score: ${score}/${questions.length};`
}
function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = Time `left: ${timeLeft}s;`

  timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = Time `left: ${timeLeft}s;`

      if (timeLeft === 0) {
          clearInterval(timer);
          alert("Time's up!");
          checkAnswer(); // Automatically submit the answer
          loadQuestion()
      }
  }, 1000);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("results").style.display = "none";
  loadQuestion();
}