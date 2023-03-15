// GET API PRODUCT
var productAPI = 'http://localhost:3000/product';
const productID = localStorage.getItem('productId');
// Xóa thông tin sản phẩm khỏi localStorage

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
function renderProduct(products) {
  products.forEach((product) => {
    // render detail
    if (product.id == productID) {
      renderProductDetail(product);
      renderProductDescription(product);
      products.forEach((productBrandAPI) => {
        if (
          product.id != productBrandAPI.id &&
          productBrandAPI.brand == product.brand
        ) {
          renderProductSimilar(product);
        }
      });
    }
  });
}
function renderProductDetail(product) {
  const ProductDetail = document.querySelector('.details-product');
  let genderHTML = '';

  for (let i = 0; i < product.gender.length; i++) {
    if (product.gender[i] === 'man') {
      genderHTML += '<div class="gender man">Nam</div>';
    } else if (product.gender[i] === 'women') {
      genderHTML += '<div class="gender women">Nữ</div>';
    }
  }
  const productHTML = `
  <div class="row">
  <div class="details-product_left">
    <div class="img-product-main">
      <img
        src="${product.img}"
        alt="${product.name}"
      />
    </div>
    <ul class="list-img-sub">
      <li class="item-img">
        <img
          class="img-product_sub"
          src="${product.img}"
          alt="${product.name}" 
           />
      </li>
      <li class="item-img">
      <img
        class="img-product_sub"
        src="${product.img}"
        alt="${product.name}" 
         />
    </li>
    <li class="item-img">
        <img
          class="img-product_sub"
          src="${product.img}"
          alt="${product.name}" 
           />
      </li>
    </ul>
  </div>
  <div class="details-product_right">
    <div class="name-product">
      <h1>${product.name}</h1>
    </div>
    <div class="brand-product">
      <p>Thương hiệu: <span class="name-brand">${product.brand}</span></p>
      <p>
        Mã sản phẩm :
        <span class="id-product">${product.id}</span>
      </p>
    </div>
    <div class="price-product">${product.price} ₫</div>
    <div class="gender-product">
      <span class="form-gender">Phù hợp :</span>
      ${genderHTML}
    </div>
    <div class="info-product">
    ${product.info}
    </div>
    <div class="number-product">
      <p>Số lượng :</p>
      <div class="selection-number">
        <button class="btn-selection-number btn-remove">
          <ion-icon name="remove-outline"></ion-icon>
        </button>
        <input class="value-number" value="1" />
        <button class="btn-selection-number btn-add">
          <ion-icon name="add-outline"></ion-icon>
        </button>
      </div>
    </div>
    <div class="button-action">
      <button class="btn-action btn-add_product">
        <ion-icon name="cart"></ion-icon>
        Thêm vào giỏ hàng
      </button>
      <button class="btn-action btn-buy_product">
        Mua sản phẩm
      </button>
    </div>
  </div>
</div>
  `;
  ProductDetail.insertAdjacentHTML('beforeend', productHTML);
}
function renderProductDescription(product) {
  const ProductDetail = document.querySelector('.description-products');
  let descriptionHTML = '';

  for (let i = 0; i < product.description.length; i++) {
    descriptionHTML += `<p>- ${product.description[i]}</p>`;
  }
  const productHTML = `
  ${descriptionHTML}
  `;
  ProductDetail.insertAdjacentHTML('beforeend', productHTML);
}
function renderProductSimilar(product) {
  const productsSimilar = document.querySelector(
    '.similar-product .swiper-wrapper'
  );
  let productHTML = `
      <div class="item-product_choice swiper-slide">
        <div class="product-thumbnail">
        <a class="link-detail-product" href="detail.html" data-id="${product.id}">
        <img src="${product.img}"
        data-src="${product.img}" alt="${product.name}" class="img-thumb" "/>
        </a>
          <div class="product-action">
          <a class="btn-card">
                <ion-icon name="cart"></ion-icon>
              </a>
          <a class="btn-view" href="detail.html" data-id="${product.id}">
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
  productsSimilar.insertAdjacentHTML('beforeend', productHTML);
}
start();
localStorage.removeItem('currentProductId');
// btn add-remove
function actionAddRemoveProduct() {
  const btnRemove = document.querySelector('.btn-remove');
  const btnAdd = document.querySelector('.btn-add');
  const valueNumber = document.querySelector('.value-number');
  btnRemove.addEventListener('click', function () {
    let value = parseInt(valueNumber.value);
    if (value > 1) {
      valueNumber.value = value - 1;
    }
  });
  btnAdd.addEventListener('click', function () {
    let value = parseInt(valueNumber.value);
    valueNumber.value = value + 1;
  });
}
const myTimeout = setTimeout(actionAddRemoveProduct, 500);
var swiperProduct = new Swiper('.product-similar-swiper', {
  slidesPerView: 5,
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
