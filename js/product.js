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
    // console.log(products)
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

//sort default
function renderDefault(){
  let defaultBtn = document.querySelector('.item-sort_default');
    defaultBtn.addEventListener('click', () => {
      renderListProduct();
    });
}



///sortAZ
function renderSortAZ(a) {
  a= [];
  getProducts((products) => {
    sortAZ(products)
      for(var i in products)
      a.push(products[i]);
      let defaultBtn = document.querySelector('.item-sort_A-Z');
      defaultBtn.addEventListener('click', () => {
        a.forEach(renderProduct);
        // console.log(a);
      });
  });
}

function sortAZ(products){
  for (var i = 0; i < products.length - 1; i++)
  for (var j = i + 1; j < products.length; j++) {
    if (products[i].name > products[j].name) {
      var temp;
      temp = products[j];
      products[j] = products[i];
      products[i] = temp;
    }
  }
}

//sortZA
function sortZA(products){
  for (var i = 0; i < products.length - 1; i++)
  for (var j = i + 1; j < products.length; j++) {
    if (products[i].name < products[j].name) {
      var temp;
      temp = products[j];
      products[j] = products[i];
      products[i] = temp;
    }
  }
}

function renderSortZA(a) {
  a= [];
  getProducts((products) => {
    sortZA(products)
      for(var i in products)
      a.push(products[i]);
      let defaultBtn = document.querySelector('.item-sort_Z-A');
      defaultBtn.addEventListener('click', () => {
        a.forEach(renderProduct);
      });
  });
}

//sort price ASC 
function sortASC(products){
  for (var i = 0; i < products.length - 1; i++)
  for (var j = i + 1; j < products.length; j++) {
    if (products[i].price > products[j].price) {
      var temp;
      temp = products[j];
      products[j] = products[i];
      products[i] = temp;
    }
  }
}

function renderSortASC(a) {
  a= [];
  getProducts((products) => {
    sortASC(products)
      for(var i in products)
      a.push(products[i]);
      let defaultBtn = document.querySelector('.item-sort_price-asc');
      defaultBtn.addEventListener('click', () => {
        a.forEach(renderProduct);
      });
  });
}

//sort price DESC
function sortDESC(products){
  for (var i = 0; i < products.length - 1; i++)
  for (var j = i + 1; j < products.length; j++) {
    if (products[i].price < products[j].price) {
      var temp;
      temp = products[j];
      products[j] = products[i];
      products[i] = temp;
    }
  }
}

function renderSortDESC(a) {
  a= [];
  getProducts((products) => {
    sortDESC(products)
      for(var i in products)
      a.push(products[i]);
      let defaultBtn = document.querySelector('.item-sort_price-desc');
      defaultBtn.addEventListener('click', () => {
        a.forEach(renderProduct);
      });
  });
}
//start
function start() {
  renderListProduct();
  renderDefault();
  renderSortAZ();
  renderSortZA();
  renderSortASC();
  renderSortDESC();
}
start();
