const calcEntry = document.querySelector(".calc__entry");
const calcResult = document.querySelector(".calc__result");
const inputBtns = document.querySelectorAll(".calc__button");
const cleanBtn = document.querySelector(".calc__button--clean");
const btnOn = document.querySelector(".calc__button--on");
const cleanOne = document.querySelector(".calc__button--clean-one");

let result = false;

btnOn.addEventListener("click", () => {
  calcEntry.classList.toggle("calc-on");
  clear();
});

const sendNumberValue = (num) => {
  if (result) {
    calcEntry.value = "";
    result = false;
  }
  if (num == ".") {
    if (calcEntry.value == "") {
      calcEntry.value += 0;
    }
    if (calcEntry.value.includes(".")) {
      num = "";
    }
  }
  if (calcEntry.value == "0" && num == "0" && !calcEntry.value.includes(".")) {
    return;
  }
  calcEntry.value += num;
};

const useOperator = (op) => {
  result = false;

  let exp = calcEntry.value;
  if (!exp) {
    if (op == "+" || op == "*" || op == "/") return;

    if (op == "-") {
      exp += op;
    }
    calcEntry.value += exp;
  } else {
    calcResult.value += calcEntry.value + op;
    calcEntry.value = "";
  }
  calcResult.value = calcResult.value.replace("--", "");
};

const eql = () => {
  result = true;
  let exp = calcResult.value + calcEntry.value;
  if(exp) {
    exp = exp.replace('--', '+');
    calcEntry.value = eval(exp);
  }
  calcResult.value = "";
};

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.contains("num")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("eql")) {
    inputBtn.addEventListener("click", () => eql());
  }
});

const clear = () => {
  calcEntry.value = "";
  calcResult.value = "";
};

const clearOne = () => {
  let exp = calcEntry.value;
  calcEntry.value = exp.substring(0, exp.length - 1);
};

cleanOne.addEventListener("click", clearOne);

cleanBtn.addEventListener("click", clear);

window.addEventListener("keydown", (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
    sendNumberValue(e.key);
  } else if (e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*") {
    useOperator(e.key);
  } else if (e.key == "Backspace") {
    clearOne();
  } else if (e.key == "=" || e.key == "Enter") {
    e.preventDefault();
    eql();
  }
});