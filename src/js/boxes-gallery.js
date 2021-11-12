import lightGallery from 'lightgallery';
import lgAutoplay from 'lightgallery/plugins/autoplay';

const $boxesList = document.querySelector('.boxes__list');
lightGallery($boxesList, {
  speed: 500,
  plugins: [lgAutoplay],
  mode: 'fade',
  selector: '.boxes__full-icon',
  download: false,
  loop: false,
  mousewheel: true,
  slideShowInterval: 3000,
  progressBar: true,
  slideEndAnimation: false,
  mode: 'lg-fade'
});

const $openGalleryImgBtns = document.querySelectorAll('.boxes__item-btn_open');
$openGalleryImgBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const $fullBtn = $btn.closest('.boxes__item').querySelector('.boxes__full-icon');
    $fullBtn.click();
  });
});
