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
  } else if (calcEntry.value.indexOf(".") == -1) {
    calcEntry.value = calcEntry.value.replace("0", "");
  }
  calcEntry.value += num;
};

const useOperator = (op) => {
  result = false;
  if (op == "-") {
    calcEntry.value += op;
    calcEntry.value = calcEntry.value.replace("--", "-");
  } else if (calcEntry.value) {
    calcResult.value += calcEntry.value + op;
    calcEntry.value = "";
  }
};

const eql = () => {
  result = true;
  let exp = calcResult.value + calcEntry.value;
  calcEntry.value = Math.round(eval(exp) * 100000000) / 100000000;
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
