var productAPI = 'http://localhost:3000/product';
function shortText(text, maxLength) {
  let shortText = text.substr(0, maxLength);
  if (text.length > maxLength) {
    shortText += '...';
  }
  return shortText;
}
async function getProducts(callback) {
  try {
    const response = await axios.get(productAPI);
    callback(response.data);
  } catch (error) {
    console.log(error);
  }
}
function renderListProduct() {
  getProducts((products) => {
    products.forEach(renderProduct);
  });
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
  data-src="${product.img}" alt="${product.name}" class="img-thumb" "/>
    <div class="product-action">
      <div class="btn-card">
        <ion-icon name="cart"></ion-icon>
      </div>
      <div class="btn-view" href="detail.html" data-id="${product.id}">
        <ion-icon name="eye"></ion-icon>
      </div>
    </div>
  </div>
  <div class="product-info">
    <a class="product-name" href="#"
      >${product.name}</a
    >
    <div class="price-box">${product.price} đ</div>
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
//start render
function start() {
  renderListProduct();
}
start();
// ****************
//ASIDE: SELECTION LIST NAV ITEM VIEW PRODUCTS
// ****************
const listNavItem = document.querySelectorAll('.nav-item');
listNavItem.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    const typeItem = navItem.getAttribute('data-tab');
    let viewProduct = document.querySelector('.view-products');
    viewProduct.innerHTML = '';
    getProducts((products) => {
      products.forEach((product) => {
        for (let i = 0; i < product.type.length; i++) {
          if (product.type[i] == typeItem) {
            renderProduct(product);
          }
        }
      });
    });
  });
});
// CLICK DETAIL_PRODUCT

function clickDetailProduct() {
  const btnViewList = document.querySelectorAll('.btn-view');
  const linkTextInfo = document.querySelectorAll('.link-text_details');
  const linkDetailList = document.querySelectorAll('.link-detail-product');
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
}
const myTimeout = setTimeout(clickDetailProduct, 500);
//
function sortDefault() {
  const sortDefaultELement = document.querySelector('.item-sort_default');
  console.log(sortDefaultELement);
  sortDefaultELement.addEventListener('click', () => {
    console.log('...');
    renderListProduct();
  });
}
const myTimeout2 = setTimeout(sortDefault, 500);
