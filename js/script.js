document.addEventListener("DOMContentLoaded", () => {
  const N = 4;
  let multiplier = 1;
  const examplesContainer = document.getElementById("examples-container");
  const doneButton = document.getElementById("done-button");
  let currentInputField = null;

  function addExample() {
    const exampleWrapper = document.createElement("div");
    exampleWrapper.classList.add("example");

    const exampleText = document.createElement("span");
    exampleText.textContent = `${N} x ${multiplier} = `;
    exampleText.classList.add("example-text");
    exampleWrapper.appendChild(exampleText);

    const inputField = document.createElement("input");
    inputField.type = "number";
    inputField.classList.add("input");
    inputField.placeholder = "Ответ";

    inputField.addEventListener("input", () => {
      if (inputField.value.trim() !== "") {
        enableButton();
        currentInputField = inputField;
      } else {
        disableButton();
      }
    });

    inputField.addEventListener("change", () => {
      checkAnswer(inputField, exampleText);
    });
    exampleWrapper.appendChild(inputField);

    const blocksContainer = document.createElement("div");
    blocksContainer.classList.add("blocks-container");
    exampleWrapper.appendChild(blocksContainer);

    examplesContainer.appendChild(exampleWrapper);
    inputField.focus();
  }

  function checkAnswer(inputField, exampleText) {
    const userAnswer = parseInt(inputField.value, 10);
    const correctAnswer = N * multiplier;

    if (userAnswer === correctAnswer) {
      markAsCorrect(inputField, exampleText);
      addBlocks(inputField.parentElement.querySelector(".blocks-container"));
      multiplier++;
      multiplier <= 10 ? setTimeout(addExample, 500) : enableCompletion();
    } else {
      markAsWrong(inputField);
    }
  }

  function markAsCorrect(inputField, exampleText) {
    doneButton.classList.remove("wrong");
    doneButton.classList.add("right");

    inputField.disabled = true;
    inputField.classList.add("correct");
    inputField.style.color = getComputedStyle(exampleText).color;
    inputField.style.fontWeight = getComputedStyle(exampleText).fontWeight;
    inputField.style.fontSize = getComputedStyle(exampleText).fontSize;
  }

  function markAsWrong(inputField) {
    inputField.style.color = "red";
    doneButton.classList.remove("right");
    doneButton.classList.add("wrong");

    setTimeout(() => {
      inputField.style.color = "";
      resetButton();
    }, 1000);
  }

  function addBlocks(blocksContainer) {
    const row = document.createElement("div");
    row.classList.add("blocks-row");

    for (let i = 0; i < 4; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      row.appendChild(block);
    }
    blocksContainer.appendChild(row);
  }

  function enableCompletion() {
    doneButton.disabled = false;
    doneButton.classList.remove("disabled");
    resetButton();
  }

  function enableButton() {
    doneButton.disabled = false;
    doneButton.classList.remove("disabled");
  }

  function disableButton() {
    doneButton.disabled = true;
    doneButton.classList.add("disabled");
    resetButton();
  }

  function resetButton() {
    doneButton.classList.remove("right", "wrong");
    doneButton.classList.add("disabled");
    doneButton.disabled = true;
  }

  addExample();
});
