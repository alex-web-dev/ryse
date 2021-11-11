import Swiper from 'swiper';

new Swiper('.companies__slider', {
  direction: 'horizontal',
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 5,
    },
    480: {
      slidesPerView: 3,
    }
  }
});

new Swiper('.reviews__list', {
  direction: 'horizontal',
  slidesPerView: 1,
  loop: true,
  breakpoints: {
  },
  autoplay: {
    delay: 6000
  }
});

new Swiper('.explore__list', {
  direction: 'horizontal',
  slidesPerView: 1,
  watchOverflow: false,
  loop: false,
  breakpoints: {
    992: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 2,
    }
  }
});