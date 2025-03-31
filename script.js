// Quiz questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Function to load previous answers from sessionStorage
function loadPreviousAnswers() {
  const storedAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
  return storedAnswers;
}

// Function to save answers to sessionStorage
function saveAnswer(questionIndex, selectedChoice) {
  const savedAnswers = loadPreviousAnswers();
  savedAnswers[questionIndex] = selectedChoice;
  sessionStorage.setItem("progress", JSON.stringify(savedAnswers));
}

// Function to render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content
  const savedAnswers = loadPreviousAnswers();

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Pre-select the saved answer if available
      if (savedAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      choiceInput.addEventListener("change", () => saveAnswer(i, choice));

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Function to calculate score and store in localStorage
function calculateScore() {
  const savedAnswers = loadPreviousAnswers();
  let score = 0;

  questions.forEach((question, i) => {
    if (savedAnswers[i] === question.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem("score", score);
}

// Load last score if available
function loadLastScore() {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreElement.textContent = `Your last score was ${lastScore} out of ${questions.length}`;
  }
}

// Submit button click event
submitButton.addEventListener("click", calculateScore);

// Initialize quiz
renderQuestions();
loadLastScore();
