const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider__wrapper");
const sliderItems = document.querySelectorAll(".slider__item");
const nextBtn = document.querySelector(".slider-btn--next");
const prevBtn = document.querySelector(".slider-btn--prev");
const dotsContainer = document.querySelector(".dots");
const input = document.querySelector(".www");
const visitSlide = document.querySelector(".slide-show input");
const sliderShowBtn = document.querySelector(".slide-show__btn");

let position = 0;
let index = 0;
let slideShow = localStorage.getItem("count")
  ? JSON.parse(localStorage.getItem("count"))
  : 1;
let dots;
let itemWidth = slider.offsetWidth / slideShow;

visitSlide.addEventListener("input", () => {
  sliderShowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("count", JSON.stringify(visitSlide.value));
    location.assign("/WD-javascript/");
  });
});

sliderItems.forEach((item) => (item.style.minWidth = itemWidth + "px"));

createDots();

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function createDots() {
  for (let i = 0; i < sliderItems.length - slideShow + 1; i++) {
    const dotItem = document.createElement("span");
    dotItem.classList.add("dot");
    dotsContainer.appendChild(dotItem);
  }
  dots = document.querySelectorAll(".dot");
  dots[0].classList.add("dot--active");
}
dots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    position = itemWidth * dotIndex;
    sliderWrapper.style.left = -position + "px";
    index = dotIndex;
    activeDot(index);
  });
});

function activeDot(index) {
  for (let dot of dots) {
    dot.classList.remove("dot--active");
  }
  dots[index].classList.add("dot--active");
}
function nextSlide() {
  if (position < itemWidth * (sliderItems.length - slideShow)) {
    position += itemWidth;
    index++;
  } else {
    position = 0;
    index = 0;
  }
  sliderWrapper.style.left = -position + "px";
  activeDot(index);
}
function prevSlide() {
  if (position > 0) {
    position -= itemWidth;
    index--;
  } else {
    position = itemWidth * (sliderItems.length - slideShow);
    index = sliderItems.length - slideShow;
  }
  sliderWrapper.style.left = -position + "px";
  activeDot(index);
}
