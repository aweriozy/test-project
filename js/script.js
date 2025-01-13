document.addEventListener("DOMContentLoaded", () => {
  const n = 2;
  const exampleEl = document.getElementById("example");
  const answerInput = document.getElementById("answer");
  const submitButton = document.getElementById("submit");
  const feedbackEl = document.getElementById("feedback");
  const animationArea = document.getElementById("animation-area");

  let currentMultiplier = 1;

  function generateQuestion() {
    exampleEl.textContent = `${n} x ${currentMultiplier} = ?`;
    answerInput.value = "";
    answerInput.focus();
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
  }

  function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    const correctAnswer = n * currentMultiplier;

    if (userAnswer === correctAnswer) {
      feedbackEl.textContent = "Правильно!";
      feedbackEl.classList.remove("hidden");
      submitButton.classList.remove("wrong");
      submitButton.classList.add("right");

      const block = document.createElement("div");
      block.classList.add("block");
      block.textContent = correctAnswer;
      animationArea.appendChild(block);

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        submitButton.classList.remove("right");
        block.remove();
        currentMultiplier++;
        generateQuestion();
      }, 1000);
    } else {
      feedbackEl.textContent = "Неправильно!";
      feedbackEl.classList.remove("hidden");
      submitButton.classList.remove("right");
      submitButton.classList.add("wrong");

      setTimeout(() => {
        feedbackEl.classList.add("hidden");
        submitButton.classList.remove("wrong");
      }, 1000);
    }
  }

  answerInput.addEventListener("input", () => {
    if (answerInput.value.trim() !== "") {
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    } else {
      submitButton.disabled = true;
      submitButton.classList.add("disabled");
    }
  });

  submitButton.addEventListener("click", checkAnswer);

  generateQuestion();
});
