const calcResult = document.querySelector(".calc__result");
const inputBtns = document.querySelectorAll(".calc__button");
const cleanBtn = document.querySelector(".calc__button--clean");
const btnOn = document.querySelector(".calc__button--on");
const cleanOne = document.querySelector(".calc__button--clean-one");

let result = false;

const clear = () => {
  calcResult.value = "";
};

btnOn.addEventListener("click", () => {
  calcResult.classList.toggle("calc-on");
  clear();
});

const sendNumberValue = (num) => {
  if (result) {
    calcResult.value = "";
    result = false;
  }

  if (num == ".") {
    if (calcResult.value == "") {
      calcResult.value += 0;
    }
    if (calcResult.value.includes(".")) {
      num = "";
    }
  } else if (calcResult.value.indexOf(".") == -1) {
    calcResult.value = calcResult.value.replace("0", "");
  }
  calcResult.value += num;
};

const useOperator = (op) => {
  result = false;
  if (op == "-") {
    calcResult.value += op;
    calcResult.value = calcResult.value.replace("--", "-");
  } else if (calcResult.value) {
    calcResult.value += op;
  }
};

const eql = () => {
  if (calcResult.value == "") return;
  calcResult.value = Math.round(eval(calcResult.value) * 100000000) / 100000000;
  result = true;
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

cleanOne.addEventListener("click", () => {
  let exp = calcResult.value;
  calcResult.value = exp.substring(0, exp.length - 1);
});

cleanBtn.addEventListener("click", clear);

window.addEventListener("keydown", (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
    sendNumberValue(e.key);
  } else if (e.key == "+" || e.key == "-" || e.key == "/" || e.key == "*") {
    useOperator(e.key);
  } else if (e.key == "=" || e.key == "Enter") {
    e.preventDefault();
    eql();
  }
});
