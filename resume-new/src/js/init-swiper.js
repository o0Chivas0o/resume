export default function(){
  return !function () {
    let view = View('#mySlide')
    let controller = {
      view: null,
      swiper: null,
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        // effect: '', swiper主题
        grabCursor: false,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      init: function (view) {
        this.view = view
        this.initSwiper()
      },
      initSwiper: function () {
        this.swiper = new Swiper(
          this.view.querySelector('.swiper-container'),
          this.swiperOptions
        )
      }
    }
    controller.init(view)
  }.call()
}
