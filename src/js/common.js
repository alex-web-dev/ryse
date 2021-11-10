import Swiper from 'swiper';
import WOW from 'wow.js';

const wowOffset = window.innerWidth > 768 ? 250 : 50
const wow = new WOW(
  {
    offset:      wowOffset,
    mobile:      true,
    live:        true,
    duration: 2000
  }
);

wow.init();

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

moveHeader();
toggleScrollUp();

window.addEventListener('scroll', moveHeader);
window.addEventListener('scroll', toggleScrollUp);

const $header = document.querySelector('.header');
const $headerMenu = $header.querySelector('.header__menu');
const menuAdaptive = 992;

const $menuToggle = $headerMenu.querySelector('.menu__toggle');
$menuToggle.addEventListener('click', () => {
  if (window.innerWidth > menuAdaptive) {
    return;
  }
  
  $headerMenu.classList.toggle('menu_active');
});

const $menuClose = $headerMenu.querySelector('.menu__close');
$menuClose.addEventListener('click', () => {
  if (window.innerWidth > menuAdaptive) {
    return;
  }
  
  $headerMenu.classList.remove('menu_active');
});

$headerMenu.addEventListener('click', (e) => {
  if (window.innerWidth > menuAdaptive || e.target !== $headerMenu) {
    return;
  }

  $headerMenu.classList.remove('menu_active');
});

const $menuHasChildItems = document.querySelectorAll('.menu__item_has-children');
$menuHasChildItems.forEach(($item) => {
  $item.addEventListener('click', () => {
    $item.classList.toggle('menu__item_open')
  });
});

const $scrollUp = document.querySelector('.scrollup');
if ($scrollUp) {
  $scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const $plansTabsBtns = document.querySelectorAll('.plans-tabs__btn');
$plansTabsBtns.forEach(($btn, index) => {
  $btn.addEventListener('click', () => {
    if ($btn.className.includes('plans-tabs__btn_active')) {
      return;
    }

    const $activeTab = document.querySelector('.plans-tabs__tab_active');
    const $activeBtn = document.querySelector('.plans-tabs__btn_active');
    $activeTab.classList.remove('plans-tabs__tab_active');
    $activeBtn.classList.remove('plans-tabs__btn_active');
    
    $btn.classList.add('plans-tabs__btn_active');

    const $newActiveTab = document.querySelectorAll('.plans-tabs__tab')[index];
    $newActiveTab.classList.add('plans-tabs__tab_active');
  });
});

function moveHeader() {
  const $header = document.querySelector('.header');

  if (!$header) {
    return;
  }
  
  if (window.scrollY > 400 && window.scrollY < 600 && !$header.className.includes('header_hide')) {
    $header.classList.add('header_hide');
  } else if (window.scrollY <= 100 && $header.className.includes('header_hide')) {
    $header.classList.remove('header_hide');
  }

  if (window.scrollY > 600 && ($header.className.includes('header_hide') || !$header.className.includes('header_fixed'))) {
    $header.classList.add('header_fixed');
    $header.classList.remove('header_hide');
  } else if (window.scrollY <= 600 && window.scrollY > 400 && !$header.className.includes('header_hide')) {
    $header.classList.add('header_hide');
  }

  if (window.scrollY < 350 && $header.className.includes('header_fixed')) {
    $header.classList.remove('header_fixed');
  }

  if (window.scrollY < 350 && $header.className.includes('header_hide')) {
    $header.classList.remove('header_hide');
  }
}

function toggleScrollUp() {
  const $scrollUp = document.querySelector('.scrollup');

  if (!$scrollUp) {
    return;
  }

  if (window.scrollY >= 200 && !$scrollUp.className.includes('scrollup_show')) {
    $scrollUp.classList.add('scrollup_show');
  } else if (window.scrollY < 200 && $scrollUp.className.includes('scrollup_show')) {
    $scrollUp.classList.remove('scrollup_show');
  }
}