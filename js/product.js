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
    <img
    img src="${product.img}"
    data-src="${product.img}" alt="${product.name}"
      class="img-thumb"
    />
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
    <a class="product-name" href="#"
      >${product.name}</a
    >
    <div class="price-box">${product.price} đ</div>
    <div class="text-details">
    ${shortText(product.info, 190)}
      <a>Xem chi tiết</a>
    </div>
  </div>
</div>
  `
  );
}
// *************************
// **********SELECTION VIEW PRODUCTS******
// *************************
// ASIDE: list nav selection
const tabLinks = document.querySelectorAll('.nav-item');
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

///sort
function sortAZ() {
  getProducts((products) => {
    for (var i = 0; i < products.length - 1; i++)
      for (var j = i + 1; j < products.length; j++) {
        if (products[i].name > products[j].name) {
          var temp;
          temp = products[j];
          products[j] = products[i];
          products[i] = temp;
        }
      }
  });
}
function renderSortAZ() {
  let defaultBtn = document.querySelector('.item-sort_default');
  defaultBtn.addEventListener('click', () => {});
}

//start
function start() {
  renderListProduct();
  renderSortAZ();
}
start();
