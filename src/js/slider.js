const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider__wrapper");
const sliderItems = document.querySelectorAll(".slider__item");
const nextBtn = document.querySelector(".slider-btn--next");
const prevBtn = document.querySelector(".slider-btn--prev");
const dots = document.querySelectorAll(".dot");
let slideShow = 1;
let position = 0;
let index = 0;

const itemWidth = slider.offsetWidth / slideShow; // ширина каждого слайда
sliderItems.forEach((item) => (item.style.minWidth = itemWidth + "px"));

const nextSlide = () => {
  if (position < itemWidth * (sliderItems.length - slideShow)) {
    position += itemWidth;
    index++;
  } else {
    position = 0;
    index = 0;
  }
  sliderWrapper.style.left = -position + "px";
  activeDot(index);
};
const prevSlide = () => {
  console.log("prev");
  if (position > 0) {
    position -= itemWidth;
    index--;
  } else {
    position = itemWidth * (sliderItems.length - slideShow);
    index = sliderItems.length - slideShow;
  }
  sliderWrapper.style.left = -position + "px";
  activeDot(index);
};

const activeDot = (index) => {
  for (let dot of dots) {
    dot.classList.remove("dot--active");
  }
  dots[index].classList.add("dot--active");
};
dots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    position = itemWidth * dotIndex;
    sliderWrapper.style.left = -position + "px";
    index = dotIndex;
    activeDot(index);
  });
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
