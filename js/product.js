var productAPI = 'http://localhost:3000/product';
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

async function getProducts(cb) {
  fetch(productAPI)
    .then((res) => {
      return res.json();
    })
    .then(cb);
}
// getProducts((products)=>{
//   console.log(products);
// });

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
  <div class="item-product swiper-slide">
  <div class="product-thumbnail">
    <img
      src="${product.img}"
      alt="${product.name}"
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
    ${product.description}
      <a>Xem chi tiết</a>
    </div>
  </div>
</div>
  `
  );
}

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
  defaultBtn.addEventListener('click', () => {
    console.log(1);
  });
}

//start
function start() {
  renderListProduct();
  renderSortAZ();
}
start();
var array = ['b', 'c', 'a'];
var a = array.sort();
console.log(a);
