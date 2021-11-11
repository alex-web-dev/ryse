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
    if (window.innerWidth > menuAdaptive) {
      return;
    }

    const $subMenu = $item.querySelector('.menu__submenu');
    if (!$item.className.includes('menu__item_open')) {
      $subMenu.style.height = `${ $subMenu.scrollHeight }px`;
    } else {
      $subMenu.style.height = `${ $subMenu.scrollHeight }px`;
      window.getComputedStyle($subMenu, null).getPropertyValue('height');
      $subMenu.style.height = '0';
    }
    
    $item.classList.toggle('menu__item_open');
  });
});