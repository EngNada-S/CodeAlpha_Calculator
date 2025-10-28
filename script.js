// =============== Dom Elements ===============
const display = document.getElementById("display");
const calcButtons = document.querySelectorAll(".keys input");

// =============== Constants & State ===============
const specialChars = ["*", "/", "+", "-", "="];
let output = "";

// =============== Utility Functions ===============
const updateDisplay = (color = "black") => {
  display.value = output || "0";
  display.style.color = color;
};

const clearDisplay = () => {
  output = "";
  updateDisplay();
};

const deleteLast = () => {
  output = output.slice(0, -1);
  updateDisplay();
};

const evaluation = function () {
  try {
    output = eval(output).toString();
    updateDisplay();
  } catch (e) {
    output = "Error";
    updateDisplay("red");
    setTimeout(() => {
      output = "";
      updateDisplay();
    }, 1000);
  }
};

// =============== Input Processing ===============
const inputProcess = (btnValue) => {
  const lastChar = output.slice(-1);
  const isOperator = specialChars.includes(btnValue);

  // Prevent multiple operators or invalid starts
  if (output === "" && isOperator && btnValue !== "-") return;

  // Handle cases
  switch (btnValue) {
    case "AC":
      return clearDisplay();

    case "DE":
      return deleteLast();

    case "=":
      if (specialChars.includes(lastChar)) return;
      return evaluation();

    case ".":
      const lastNum = output.split(/[\+\-\*\/]/).pop();
      if (!lastNum.includes(".")) output += btnValue;
      break;

    default:
      if (isOperator && specialChars.includes(lastChar)) {
        output = output.slice(0, -1) + btnValue;
      } else {
        output += btnValue;
      }
  }

  updateDisplay();
};

// =============== Event Binding ===============
calcButtons.forEach(btn => {
  btn.addEventListener("click", e => inputProcess(e.target.value));
});

window.addEventListener("keydown", e => {
  const key = e.key;
  if (!isNaN(key) || specialChars.includes(key) || key === ".") inputProcess(key);
  else if (key === "Enter") inputProcess("=");
  else if (key === "Backspace") inputProcess("DE");
  else if (key === "Escape") inputProcess("AC");
});
