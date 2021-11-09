new Swiper('.companies__slider', {
  direction: 'horizontal',
  slidesPerView: 5,
  loop: true,
  breakpoints: {
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
  slidesPerView: 3,
  watchOverflow: false,
  loop: false,
  breakpoints: {
  }
});

moveHeader();
toggleScrollUp();

window.addEventListener('scroll', moveHeader);
window.addEventListener('scroll', toggleScrollUp);

const $scrollUp = document.querySelector('.scrollup');
$scrollUp.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const $plansTabsBtns = document.querySelectorAll('.plans-tabs__btn');
$plansTabsBtns.forEach(function($btn, index) {
  $btn.addEventListener('click', function() {
    console.log(index, $btn);
    
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

  if (window.scrollY >= 200 && !$scrollUp.className.includes('scrollup_show')) {
    $scrollUp.classList.add('scrollup_show');
  } else if (window.scrollY < 200 && $scrollUp.className.includes('scrollup_show')) {
    $scrollUp.classList.remove('scrollup_show');
  }
}