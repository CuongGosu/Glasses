// SWIPER PRODUCTS
var heroCarousel = new Swiper('.hero-data-carousel', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
var swiperCategory = new Swiper('.category-data-slicks', {
  slidesPerView: 5,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  grabCursor: 'true',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1008: {
      slidesPerView: 5,
    },
    672: {
      slidesPerView: 4,
    },
    500: {
      slidesPerView: 3,
    },
    300: {
      slidesPerView: 3,
    },
  },
});
var swiperTab = new Swiper('.tab-product', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
});
var swiperProduct = new Swiper('.index-product', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
var swiperMoreChoice = new Swiper('.product-choice-swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  grid: {
    rows: 2,
    fill: 'row',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1008: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: 'row',
      },
      spaceBetween: 20,
    },
    672: {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: 'row',
      },
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: 'row',
        spaceBetween: 5,
      },
    },
    100: {
      slidesPerView: 2,
      grid: {
        rows: 2,
        fill: 'row',
        spaceBetween: 5,
      },
    },
  },
});
var swiperBlog = new Swiper('.swiper-blog-container', {
  slidesPerView: 3,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1008: {
      slidesPerView: 3,
    },

    400: {
      slidesPerView: 2,
    },

    100: {
      slidesPerView: 1,
    },
  },
});
var swiperBrand = new Swiper('.brand-container', {
  slidesPerView: 6,
  spaceBetween: 20,
  breakpoints: {
    1200: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1008: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    730: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    672: {
      slidesPerView: 5,
      spaceBetween: 5,
    },
    400: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
    100: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  },
});

const toTop = document.querySelector('.back-to-up');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add('top-active');
  } else {
    toTop.classList.remove('top-active');
  }
});
toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// MINI MAP
const addressMap = document.querySelector('.address-map');
const miniMap = document.querySelector('#mini_map');
addressMap.addEventListener('mouseenter', () => {
  miniMap.style.visibility = 'visible';
  miniMap.style.pointerEvents = 'auto';
});
miniMap.addEventListener('mouseenter', () => {
  miniMap.style.visibility = 'visible';
  miniMap.style.pointerEvents = 'auto';
});
addressMap.addEventListener('mouseleave', () => {
  miniMap.style.visibility = 'hidden';
  miniMap.style.pointerEvents = 'none';
});
miniMap.addEventListener('mouseleave', () => {
  miniMap.style.visibility = 'hidden';
  miniMap.style.pointerEvents = 'none';
});
$(document).ready(function () {
  var mapObj = null;
  var defaultCoord = [15.986664203108441, 108.27116211305282]; // coord mặc định, Hà Nội
  var zoomLevel = 14.5; // Mức phóng to bản đồ
  var mapConfig = {
    attributionControl: false, // để ko hiện watermark nữa, nếu bị liên hệ đòi thì nhớ open nha
    center: defaultCoord, // vị trí map mặc định hiện tại
    zoom: zoomLevel,
  };

  mapObj = L.map('mini_map', mapConfig);

  // thêm tile để map có thể hoạt động, xài free từ OSM
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapObj);

  // Add marker
  var marker_coord = [15.986664203108441, 108.27116211305282]; // Toạ độ marker
  L.marker(marker_coord).addTo(mapObj);
});

// VIEW MOBILE
// code cho kích thước mobile
const btnOpenMenu = document.querySelector('.open-menu');
const btnCloseMenu = document.querySelector('.close-menu');
const bodyWeb = document.querySelector('body');
const headerEl = document.querySelector('.header');
btnOpenMenu.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
  bodyWeb.style.overflow = 'hidden';
});
btnCloseMenu.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
  bodyWeb.style.overflow = 'auto';
});
const menu1 = document.querySelector('.menu-nav-list_mobile');
// menu child
const moreLink = document.querySelectorAll('.icon-forward_cart');
moreLink.forEach((listLink) => {
  listLink.addEventListener('click', function () {
    const itemSmall = listLink.closest('.menu-nav-item_mobile');
    if (itemSmall != null) itemSmall.classList.toggle('active');
    menu1.style.transform = 'translateX(-100%)';
  });
});
const backMenuE = document.querySelectorAll('.link-sub_mobile .back-menu');
backMenuE.forEach((backMenu) => {
  backMenu.addEventListener('click', function () {
    const itemSmall = backMenu.closest('.menu-nav-item_mobile');
    if (itemSmall != null) itemSmall.classList.toggle('active');
    menu1.style.transform = 'translateX(0)';
  });
});
// footer child
const footerMobile = document.querySelector('.footer-mobile');
const moreInfo_Footer = document.querySelectorAll('.display-footer');
moreInfo_Footer.forEach((listInfo) => {
  listInfo.addEventListener('click', function () {
    const subInfo = listInfo.closest('.row-footer');
    if (subInfo != null) subInfo.classList.toggle('hidden-footer');
  });
});
