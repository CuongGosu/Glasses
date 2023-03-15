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
var products = [];
function start() {
  getProductApi(renderProduct);
}
async function getProductApi(callback) {
  try {
    const response = await axios.get(productAPI);

    products = response.data;
    callback(products);
  } catch (error) {
    console.log(error);
  }
}
const productTypes = {
  new: 1,
  sunglasses: 2,
  meta2022: 3,
  hot: 4,
  sale: 5,
};
function renderProduct(products) {
  products.forEach((product) => {
    renderProductTab(product);
    renderProductGender(product);
    renderProductChoice(product);
  });
}
function renderProductTab(product) {
  var tabSelectionWrappers = [];
  for (var i = 1; i <= 5; i++) {
    tabSelectionWrappers[i] = document.querySelector(
      `#tab-selection_${i} .swiper-wrapper`
    );
  }
  product.type.forEach((productType) => {
    let idTabSelection = productTypes[productType];
    let html_ItemProduct = tabSelectionWrappers[idTabSelection];
    html_ItemProduct.insertAdjacentHTML(
      'beforeend',
      `
      <div class="item-product swiper-slide">
        <div class="product-thumbnail" >
        <a class="link-detail-product" href="html/detail.html" data-id="${product.id}">
        <img src="${product.img}"
        data-src="${product.img}" alt="${product.name}" class="img-thumb" "/>
        </a>
          <div class="product-action">
            <a class="btn-card">
              <ion-icon name="cart"></ion-icon>
            </a>
            <a class="btn-view" href="html/detail.html" data-id="${product.id}">
              <ion-icon name="eye"></ion-icon>
            </a>
          </div>
        </div>
        <div class="product-info">
          <a class="product-name" href="#">${product.name}</a>
          <div class="price-box">${product.price} ₫</div>
        </div>
      </div>
    `
    );
  });
}

function renderProductGender(product) {
  var genderWrappers = [];
  genderWrappers['man'] = document.querySelector(
    `#products-man .swiper-wrapper`
  );
  genderWrappers['women'] = document.querySelector(
    `#products-women .swiper-wrapper`
  );
  product.gender.forEach((productGender) => {
    let html_ItemProduct = genderWrappers[productGender];
    html_ItemProduct.insertAdjacentHTML(
      'beforeend',
      `
      <div class="item-product swiper-slide">
        <div class="product-thumbnail" ">
        <a class="link-detail-product" href="html/detail.html" data-id="${product.id}">
        <img src="${product.img}"
        data-src="${product.img}" alt="${product.name}" class="img-thumb" "/>
        </a>
          <div class="product-action">
          <a class="btn-card">
          <ion-icon name="cart"></ion-icon>
        </a>
        <a class="btn-view" href="html/detail.html" data-id="${product.id}">
          <ion-icon name="eye"></ion-icon>
        </a>
          </div>
        </div>
        <div class="product-info">
          <a class="product-name" href="#">${product.name}</a>
          <div class="price-box">${product.price} ₫</div>
        </div>
      </div>
    `
    );
  });
}
function renderProductChoice(product) {
  const productsWrapper = document.querySelector('.list-product_choice');
  const productHTML = `
    <div class="item-product_choice swiper-slide">
      <div class="product-thumbnail">
      <a class="link-detail-product" href="html/detail.html" data-id="${product.id}">
      <img src="${product.img}"
      data-src="${product.img}" alt="${product.name}" class="img-thumb" "/>
      </a>
        <div class="product-action">
        <a class="btn-card">
              <ion-icon name="cart"></ion-icon>
            </a>
        <a class="btn-view" href="html/detail.html" data-id="${product.id}">
              <ion-icon name="eye"></ion-icon>
            </a>
        </div>
      </div>
      <div class="product-info">
        <a class="product-name" href="#">${product.name}</a>
        <div class="price-box">${product.price} ₫</div>
      </div>
    </div>
  `;
  productsWrapper.insertAdjacentHTML('beforeend', productHTML);
}
start();
// CLICK DETAIL_PRODUCT

function clickDetailProduct() {
  const btnViewList = document.querySelectorAll('.btn-view');
  const linkDetailList = document.querySelectorAll('.link-detail-product');
  btnViewList.forEach((btnView) => {
    btnView.addEventListener('click', (e) => {
      const productId = btnView.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
  linkDetailList.forEach((linkDetail) => {
    linkDetail.addEventListener('click', (e) => {
      const productId = linkDetail.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
}
const myTimeout = setTimeout(clickDetailProduct, 500);
