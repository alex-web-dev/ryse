import './sliders';
import './menu';
import './boxes-gallery';

import WOW from 'wow.js';

const wowOffset = window.innerWidth > 768 ? 250 : 50;
const wow = new WOW(
  {
    offset:      wowOffset,
    mobile:      true,
    live:        true,
    duration: 2000
  }
);
wow.init();

moveHeader();
toggleScrollUp();

window.addEventListener('scroll', moveHeader);
window.addEventListener('scroll', toggleScrollUp);

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

const $openSearchBtns = document.querySelectorAll('.search-btn');
$openSearchBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const $search = document.querySelector('.search');
    if ($search) {
      $search.classList.add('search_open');
    }
  });
});

const $searchExit = document.querySelector('.search__close');
$searchExit.addEventListener('click', () => {
  const $search = document.querySelector('.search');
  if ($search) {
    $search.classList.remove('search_open');
  }
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