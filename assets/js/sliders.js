const sliderProgress = document.querySelector(".slider__progress-thumb");
const sliderPage = document.querySelector(".slider__page");

const swiper = new Swiper(".mySwiper", {
  spaceBetween: 12,
  slidesPerView: "auto",
  breakpoints: {
    768: {
      spaceBetween: 20,
      slidesPerView: "auto",
    },
  },
  freeMode: true,
  watchSlidesProgress: true,
});

const swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".button-arrow.next",
    prevEl: ".button-arrow.prev",
  },
  thumbs: {
    swiper: swiper,
  },
  on: {
    slideChange: function () {
      updateSliderProgress(this);
      updateSliderPage(this);
    },
    init: function () {
      updateSliderProgress(this);
      updateSliderPage(this);
    },
  },
});

// Функция обновления прогресса слайдера
function updateSliderProgress(swiper) {
  if (!sliderProgress) return;

  const currentSlide = swiper.activeIndex + 1;
  const totalSlides = swiper.slides.length;
  const progress = (currentSlide / totalSlides) * 100;

  sliderProgress.style.width = `${progress}%`;
}

// Функция обновления номера страницы
function updateSliderPage(swiper) {
  if (!sliderPage) return;

  const currentSlide = swiper.activeIndex + 1;
  const totalSlides = swiper.slides.length;

  // Форматируем номер с ведущим нулем
  const formattedCurrent = currentSlide.toString().padStart(2, "0");
  const formattedTotal = totalSlides.toString().padStart(2, "0");

  sliderPage.textContent = `${formattedCurrent}`;
}
