const calcResult = document.querySelector('.calc__result');
const inputBtns = document.querySelectorAll('.calc__button');
const cleanBtn = document.querySelector('.calc__button--clean');
const cleanOne = document.querySelector('.calc__button--clean-one');

const sendNumberValue = (num) => {
  if(num == '.') {
      if(calcResult.value == '') {
        calcResult.value += 0;
      }
      if(calcResult.value.includes('.')) {
          num = '';
      }
  }
  calcResult.value += num;
}

const useOperator = (op) => {
  if(calcResult.value) {
    calcResult.value += op;
  }
}

const eql = () => {
  calcResult.value = Math.round(eval(calcResult.value) * 100000000) / 100000000;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.contains("num")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("eql")) {
    inputBtn.addEventListener("click", () => eql());
  }
});

cleanOne.addEventListener('click', () => {
  let exp = calcResult.value;
  calcResult.value = exp.substring(0, exp.length - 1);
});

cleanBtn.addEventListener("click", () => {
  calcResult.value = '';
});