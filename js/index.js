var heroCarousel = new Swiper(".hero-data-carousel", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiperCategory = new Swiper(".category-data-slicks", {
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  grabCursor: "true",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    650: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 4,
    },
    950: {
      slidesPerView: 5,
    },
  },
});
var swiperTab = new Swiper(".tab-product", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiperProduct = new Swiper(".index-product", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiperMoreChoice = new Swiper(".product-choice-swiper", {
  slidesPerView: 3,
  grid: {
    rows: 2,
    fill: "row",
  },
  spaceBetween: 30,
  pagination: {
    // el: ".swiper-pagination",
    // clickable: true,
  },
});
var swiperBlog = new Swiper(".swiper-blog-container", {
  slidesPerView: 3,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var swiperBrand = new Swiper(".brand-container", {
  slidesPerView: 1,
  breakpoints: {
    "@0.00": {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    "@1.00": {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    "@1.25": {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    "@1.50": {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
});

const toTop = document.querySelector(".back-to-up");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("top-active");
  } else {
    toTop.classList.remove("top-active");
  }
});
