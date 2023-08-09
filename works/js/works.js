'use strict';


//定義する順番に注意
// サムネイル
const swiperThumbnail = new Swiper(".swiper-thumbnail", {
  spaceBetween: 10,
  slidesPerView: 4,
  centeredSlides: true,
  centeredSlidesBounds: true,
  watchSlidesProgress: true,
  // breakpoints: {
  //   678: {
  //     direction: "vertical"
  //   }
  // }
});

// スライダー
const slider = new Swiper(".slider", {
  spaceBetween: 10,
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev"
  // },
  autoplay: true,
  loop: true,
  thumbs: {
    swiper: swiperThumbnail
  }
});