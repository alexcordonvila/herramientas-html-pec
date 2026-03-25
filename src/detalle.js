import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('.splide', {
    type   : 'loop',      
    perPage: 3,           
    gap    : '1rem',     
    breakpoints: {
      767: {
        perPage: 1,       
      },
    },
  });

  splide.mount();
});