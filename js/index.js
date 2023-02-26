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
var swiperTab = new Swiper('.tab-product', {
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
  grid: {
    rows: 2,
    fill: 'row',
  },
  spaceBetween: 30,
  pagination: {
    // el: ".swiper-pagination",
    // clickable: true,
  },
});
var swiperBlog = new Swiper('.swiper-blog-container', {
  slidesPerView: 3,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
var swiperBrand = new Swiper('.brand-container', {
  slidesPerView: 1,
  breakpoints: {
    '@0.00': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '@0.75': {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    '@1.00': {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    '@1.25': {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    '@1.50': {
      slidesPerView: 6,
      spaceBetween: 20,
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
// TAB SELECTION
const tabLinks = document.querySelectorAll('.title-link-tap');
const tabItems = document.querySelectorAll('.tab-product');
tabLinks.forEach((link) => {
  link.addEventListener('click', () => {
    tabLinks.forEach((link) => link.classList.remove('active'));
    link.classList.add('active');
    const selectedTab = link.dataset.tab;
    tabItems.forEach((item) => {
      item.classList.remove('current');
      item.style.display = 'none';
      console.log(item.id + ' va ' + selectedTab);
      if (item.id == selectedTab) {
        item.classList.add('current');
      }
    });
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
