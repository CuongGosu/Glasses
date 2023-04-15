// product.js
import { getDataProducts } from './dataAPI.js';
var dataProducts;
dataProducts = await getDataProducts();
var cachedProducts = [...dataProducts];
// VIEW MODE: grid-list
const itemList = document.querySelector('.view-products');
const gridViewBtn = document.querySelector('.view-grid');
const detailsViewBtn = document.querySelector('.view-detail');
gridViewBtn.classList.add('active-btn');
gridViewBtn.addEventListener('click', () => {
  gridViewBtn.classList.add('active-btn');
  detailsViewBtn.classList.remove('active-btn');
  itemList.classList.remove('info-detail');
});
detailsViewBtn.addEventListener('click', () => {
  detailsViewBtn.classList.add('active-btn');
  gridViewBtn.classList.remove('active-btn');
  itemList.classList.add('info-detail');
});
// change text in backgroundIMG
function changeInfoWeb(content) {
  const titlePage = document.querySelector('.title-page h1');
  const textChildrenPage = document.querySelector('.children-page');
  titlePage.innerHTML = content;
  textChildrenPage.innerHTML = content;
}
function shortText(text, maxLength) {
  let shortText = text.substr(0, maxLength);
  if (text.length > maxLength) {
    shortText += '...';
  }
  return shortText;
}
// chuyển đổi số tiền sang chuỗi có định dạng tiền tệ
function formattedPrice(price) {
  const formattedPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formattedPrice.replace(/^(\D*)(\d+)(\D*)$/, (match, p1, p2, p3) => {
    return p1 + p2.replace(/\d{3}(?=\d)/g, '$&,') + p3;
  });
}

async function renderListProduct(listProduct) {
  let viewProduct = document.querySelector('.view-products');
  viewProduct.innerHTML = '';
  const products = listProduct;
  products.forEach(renderProduct);
}
function renderProduct(product) {
  let viewProduct = document.querySelector('.view-products');
  viewProduct.insertAdjacentHTML(
    'beforeend',
    `
  <div class="item-product">
  <div class="product-thumbnail">
  <a class="link-detail-product" href="detail.html" data-id="${product.id}">
  <img src="${product.img}"
  data-src="${product.img}" alt="${product.name}" class="img-thumb" data-id="${
      product.id
    }"/>
    </a>
    <div class="product-action">
    <a class="btn-card" data-id=${product.id}>
    <ion-icon name="cart"></ion-icon>
  </a>
  <a class="btn-view" href="detail.html" data-id="${product.id}">
  <ion-icon name="eye"></ion-icon>
  </a>
    </div>
  </div>
  <div class="product-info">
    <a class="product-name" href="detail.html" data-id="${product.id}"
      >${product.name}</a>
    <div class="price-box">${formattedPrice(product.price)}</div>
    <div class="text-details">
    ${shortText(product.info, 190)}
      <a class="link-text_details" href="detail.html" data-id="${
        product.id
      }">Xem chi tiết</a>
    </div>
  </div>
</div>
  `
  );
}
//start render
async function start() {
  if (typeProduct == null) renderListProduct(dataProducts);
}
start();
// ********************view product for click type
var typeProduct = localStorage.getItem('productType');
function checkTypeViewClicked() {
  if (typeProduct != null) {
    // changeInfoWeb('Tất cả các sản phẩm');
    if (typeProduct == 'new') {
      changeInfoWeb('Sản phẩm mới');
    } else if (typeProduct == 'sale') {
      changeInfoWeb('Sản phẩm khuyến mãi');
    } else if (typeProduct == 'hot') {
      changeInfoWeb('Sản phẩm nổi bật');
    }
    cachedProducts = dataProducts.filter((product) => {
      return product.type.includes(typeProduct);
    });
    renderListProduct(cachedProducts);
  } else {
    changeInfoWeb('Tất cả các sản phẩm');
    renderListProduct(dataProducts);
  }
}
checkTypeViewClicked();
// ****************
//ASIDE: SELECTION LIST NAV ITEM VIEW PRODUCTS
// ****************

const listNavItem = document.querySelectorAll('.nav-item');
listNavItem.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    const typeItem = navItem.getAttribute('data-tab');
    if (typeItem == 'new') {
      localStorage.setItem('productType', typeItem);
      changeInfoWeb('Sản phẩm mới');
    } else if (typeItem == 'sale') {
      localStorage.setItem('productType', typeItem);
      changeInfoWeb('Sản phẩm khuyến mãi');
    } else if (typeItem == 'hot') {
      localStorage.setItem('productType', typeItem);
      changeInfoWeb('Sản phẩm nổi bật');
    }

    cachedProducts = dataProducts.filter((product) => {
      return product.type.includes(typeItem);
    });
    typeSort = 'default';
    currentSelectionSort();
    renderListProduct(cachedProducts);
  });
});

// CLICK DETAIL_PRODUCT

function clickDetailProduct() {
  const btnViewList = document.querySelectorAll('.btn-view');
  const linkTextInfo = document.querySelectorAll('.link-text_details');
  const linkDetailList = document.querySelectorAll('.img-thumb');
  const nameDetailProduct = document.querySelectorAll('.product-name');

  linkTextInfo.forEach((textView) => {
    textView.addEventListener('click', (e) => {
      const productId = textView.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
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
  nameDetailProduct.forEach((nameDetail) => {
    nameDetail.addEventListener('click', (e) => {
      const productId = nameDetail.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
}
window.addEventListener('load', clickDetailProduct);
//
// **********************************************
// *******************SORT PRODUCT****************
// **********************************************

// Sắp xếp sản phẩm theo giá tăng dần
// type sort
const typeSortCurrent = document.querySelector('.sort-current');
let typeSort = 'default';
async function currentSelectionSort() {
  if (typeSort == 'default') {
    typeSortCurrent.innerHTML = 'Mặc định';
  } else if (typeSort == 'Asc') {
    typeSortCurrent.innerHTML = 'Giá tăng dần';
  } else typeSortCurrent.innerHTML = 'Giá giảm dần';
}
async function sortProductsByDefault() {
  typeSort = 'default';
  currentSelectionSort();
  renderListProduct(cachedProducts);
}
async function sortProductsByPriceAsc() {
  typeSort = 'Asc';
  currentSelectionSort();
  const products = [...cachedProducts];
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  renderListProduct(sortedProducts);
}
// Sắp xếp sản phẩm theo giá giảm dần
async function sortProductsByPriceDesc() {
  typeSort = 'Desc';
  currentSelectionSort();
  const products = [...cachedProducts];
  const sortedProducts = products.sort((a, b) => b.price - a.price);
  renderListProduct(sortedProducts);
}

document
  .querySelector('.item-sort_default')
  .addEventListener('click', sortProductsByDefault);
document
  .querySelector('.item-sort_price-asc')
  .addEventListener('click', sortProductsByPriceAsc);
document
  .querySelector('.item-sort_price-desc')
  .addEventListener('click', sortProductsByPriceDesc);
