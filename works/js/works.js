'use strict';


//定義する順番に注意
// サムネイル
const swiperThumbnail = new Swiper(".swiper-thumbnail", {
  spaceBetween: 10,
  slidesPerView: 5,
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


//modaal
$(".gallery").modaal({
	type: 'image',
	overlay_close:true,//モーダル背景クリック時に閉じるか
	before_open:function(){// モーダルが開く前に行う動作
		$('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
	},
	after_close:function(){// モーダルが閉じた後に行う動作
		$('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
	}
});