const display = document.getElementById("display");
const history = document.getElementById("history");
let currentInput = "";
let lastResult = "";

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === "" && lastResult) {
    currentInput = lastResult;
  }
  if (/[-+*/]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += operator;
  updateDisplay();
}

function appendDecimal() {
  const parts = currentInput.split(/[-+*/]/);
  const lastPart = parts[parts.length - 1];
  if (!lastPart.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
  history.textContent = "";
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    if (/\/$/.test(currentInput)) {
      throw "Incomplete expression";
    }
    const result = eval(currentInput);
    if (!isFinite(result)) throw "Division by zero";
    history.textContent = currentInput + " =";
    currentInput = result.toString();
    lastResult = currentInput;
    updateDisplay();
  } catch (e) {
    display.textContent = "Error";
    currentInput = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) appendNumber(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) appendOperator(e.key);
  else if (e.key === ".") appendDecimal();
  else if (e.key === "Enter") calculate();
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape") clearDisplay();
});
