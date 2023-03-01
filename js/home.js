// TAB SELECTION
const tabLinks = document.querySelectorAll('.title-link-tab');
const tabItems = document.querySelectorAll('.tab-product');
tabLinks.forEach((link) => {
  link.addEventListener('click', () => {
    tabLinks.forEach((link) => link.classList.remove('active'));
    link.classList.add('active');
    const selectedTab = link.dataset.tab;
    tabItems.forEach((item) => {
      item.classList.remove('current');
      item.style.display = 'none';
      if (item.id == selectedTab) {
        item.classList.add('current');
      }
    });
  });
});
// ProductAPI
var productAPI = 'http://localhost:3000/product';
function start() {
  getProductApi(renderProductTab);
}
async function getProductApi(callback) {
  fetch(productAPI)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}
function checkType(productsType) {
  if (productsType == 'new') return 1;
  else if (productsType == 'sunglasses') return 2;
  else if (productsType == 'meta2022') return 3;
  else if (productsType == 'hot') return 4;
  return 5;
}
function renderProductTab(products) {
  products.forEach((product) => {
    product.type.forEach((productType) => {
      let idTabSelection = checkType(productType);
      let html_ItemProduct = document.querySelector(
        `#tab-selection_${idTabSelection} .swiper-wrapper`
      );
      html_ItemProduct.insertAdjacentHTML(
        'beforeend',
        `
      <div class="item-product swiper-slide">
        <div class="product-thumbnail">
          <img src="${product.img}" alt="${product.name}" class="img-thumb" />
          <div class="product-action">
            <div class="btn-card">
              <ion-icon name="cart"></ion-icon>
            </div>
            <div class="btn-view">
              <ion-icon name="eye"></ion-icon>
            </div>
          </div>
        </div>
        <div class="product-info">
          <a class="product-name" href="#">${product.name}</a>
          <div class="price-box">${product.price}</div>
        </div>
      </div>
    `
      );
    });
  });
}
start();
