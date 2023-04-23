// FIREBASE
import { getDataProducts } from './dataAPI.js';
var pathArray = window.location.pathname.split('/');
var directory = pathArray[pathArray.length - 1];
var dataProducts;
dataProducts = await getDataProducts();
var cartRef;
var dataCarts;
const infoUser = localStorage.getItem('userCarts');
export const dataCartsPromise = new Promise((resolve) => {
  const infoUser = localStorage.getItem('userCarts');
  if (infoUser) renderCarts();
  function renderCarts() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCgZEDiX1VYgdCzKQdJtd72kSpHDloogwA',
      authDomain: 'login-web-glasses-ba9eb.firebaseapp.com',
      databaseURL: 'https://login-web-glasses-default-rtdb.firebaseio.com',
      projectId: 'login-web-glasses',
      storageBucket: 'login-web-glasses.appspot.com',
      messagingSenderId: '697380575615',
      appId: '1:697380575615:web:70d3d0ea7206219330e24a',
    };
    firebase.initializeApp(firebaseConfig);
    handleCarts(infoUser);
  }
  async function handleCarts(userID) {
    const storedDataCarts = localStorage.getItem('dataCarts');
    if (storedDataCarts !== 'undefined' && storedDataCarts !== null) {
      const countCarts = localStorage.getItem('countCarts');
      if (countCarts != 0) renderInfoCartsFirst();
      else {
        renderCountItem();
      }
      if (directory == 'cart.html') {
        infoCartPage();
      }
    }
    cartRef = firebase.firestore().collection('carts').doc(userID);
    const dataDoc = await cartRef.get();
    dataCarts = dataDoc.data();
    localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
    if (storedDataCarts == 'undefined' || storedDataCarts == null) {
      setTimeout(() => {
        console.log(dataCarts);
      }, 2000);
    }
    if (directory == 'index.html' || directory == '') {
      addProductCart(infoUser);
    }

    handleQuantityButtons();
    handleDeleteProduct();
    clickDetailProductFromCart();
    resolve(dataCarts);
  }
});
async function productsCartChose(id_product) {
  return dataProducts.filter((item) => {
    return item.id == id_product;
  });
}
// CLICK ADD PRODUCT CAR

export function addProductCart(userID) {
  const btnCardElement = document.querySelectorAll('.btn-card');
  btnCardElement.forEach((btnCard) => {
    btnCard.addEventListener('click', async (e) => {
      const productId = btnCard.getAttribute('data-id');
      const productChose = await productsCartChose(productId);
      var newProduct = {
        productId: productChose[0].id,
        name: productChose[0].name,
        price: productChose[0].price,
        quantity: 1,
        img: productChose[0].img,
      };
      const existingProductIndex = dataCarts.products.findIndex((product) => {
        return product.productId === newProduct.productId;
      });
      if (existingProductIndex > -1) {
        const existingProduct = dataCarts.products[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        dataCarts.products[existingProductIndex] = updatedProduct;
        dataCarts.total += newProduct.price;
        cartRef.update({
          products: [...dataCarts.products],
          total: firebase.firestore.FieldValue.increment(newProduct.price),
        });
      } else {
        dataCarts.products.push(newProduct);
        dataCarts.total += newProduct.price;
        cartRef.update({
          products: firebase.firestore.FieldValue.arrayUnion(newProduct),
          total: firebase.firestore.FieldValue.increment(newProduct.price),
        });
        localStorage.setItem('countCarts', dataCarts.products.length);
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
      }
      renderMiniCart();
      showAddToCart();
    });
  });
}
async function renderMiniCart() {
  console.log('render datacar');
  renderCountItem();
  const viewInfoCart = document.querySelector('.view-info-cart');
  const listCartItem = document.querySelector('.list-item-mini_cart');
  if (dataCarts.products.length == 0) {
    viewInfoCart.classList.remove('is_carts');
  } else {
    viewInfoCart.classList.add('is_carts');

    listCartItem.innerHTML = '';
    dataCarts.products.forEach((product) => {
      listCartItem.insertAdjacentHTML(
        'beforeend',
        `
        <li class="item-mini_cart" data-id="${product.productId}">
        <div class="img-product-mini_cart">
          <a class="img-mini_cart" href="${pathNameCurrent()}" data-id="${
          product.productId
        }">
            <img
              alt="${product.name}"
              src="${product.img}"
            />
          </a>
        </div>
        <div class="info-product-mini_cart">
          <div class="name-product-mini_cart" data-id="${product.productId}">
            <a
              class="text-product-mini_cart"
              href="${pathNameCurrent()}"
            >
            ${product.name}
            </a>
          </div>
          <div class="price-product-mini_cart">${formattedPrice(
            product.price
          )}</div>
          <div class="quantity-product-mini_cart">
          <div class="quantity-buttons">
            <button class="quantity-button quantity-minus" type="button">-</button>
            <div class="quantity-value">${product.quantity}</div>
            <button class="quantity-button quantity-plus" type="button">+</button>
          </div>
        </div>
        </div>
        
        <div class="delete-product-mini_cart">
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </li>`
      );
    });
    changeTotalCarts();
    handleQuantityButtons();
    handleDeleteProduct();
    clickDetailProductFromCart();
  }
}
export function renderInfoCartsFirst() {
  console.log('render tu local');
  renderCountItem();
  const countItemE = document.querySelector('.count-item');
  const listCartItem = document.querySelector('.list-item-mini_cart');
  const viewInfoCart = document.querySelector('.view-info-cart');
  const storedDataCarts = localStorage.getItem('dataCarts');
  const dataCarts_localStore = JSON.parse(storedDataCarts);
  if (dataCarts_localStore.products.length == 0) {
    viewInfoCart.classList.remove('is_carts');
  } else {
    viewInfoCart.classList.add('is_carts');
    countItemE.textContent = dataCarts_localStore.products.length;
    dataCarts_localStore.products.forEach((product) => {
      listCartItem.insertAdjacentHTML(
        'beforeend',
        `
        <li class="item-mini_cart" data-id="${product.productId}">
        <div class="img-product-mini_cart">
          <a class="img-mini_cart" href="${pathNameCurrent()}"  data-id="${
          product.productId
        }">
            <img
              alt="${product.name}"
              src="${product.img}"
            />
          </a>
        </div>
        <div class="info-product-mini_cart">
          <div class="name-product-mini_cart" data-id="${product.productId}">
            <a
              class="text-product-mini_cart"
              href="${pathNameCurrent()}"
            >
            ${product.name}
            </a>
          </div>
          <div class="price-product-mini_cart">${formattedPrice(
            product.price
          )}</div>
          <div class="quantity-product-mini_cart">
          <div class="quantity-buttons">
            <button class="quantity-button quantity-minus" type="button">-</button>
            <div class="quantity-value">${product.quantity}</div>
            <button class="quantity-button quantity-plus" type="button">+</button>
          </div>
        </div>
        </div>
        
        <div class="delete-product-mini_cart">
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </li>`
      );
    });
    const totalCarts = document.querySelector('.total_cart');
    totalCarts.innerHTML = '';
    totalCarts.insertAdjacentHTML(
      'beforeend',
      `
    Tổng tiền:
    <span class="price-total_cart">
    ${formattedPrice(dataCarts_localStore.total)}
    </span>
    `
    );
  }
}
export function handleQuantityButtons() {
  const quantityButtons = document.querySelectorAll('.quantity-button');
  quantityButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const listItem = e.target.closest('.item-mini_cart');
      const productId = listItem.getAttribute('data-id');
      const productIndex = dataCarts.products.findIndex(
        (product) => product.productId === productId
      );
      const product = dataCarts.products[productIndex];
      const quantityValue = listItem.querySelector('.quantity-value');
      const quantity = parseInt(quantityValue.textContent);
      if (e.target.classList.contains('quantity-plus')) {
        const updatedProduct = {
          ...product,
          quantity: product.quantity + 1,
        };
        dataCarts.products[productIndex] = updatedProduct;
        dataCarts.total += product.price;
        cartRef.update({
          products: [...dataCarts.products],
          total: firebase.firestore.FieldValue.increment(product.price),
        });
        quantityValue.textContent = updatedProduct.quantity;
        changeTotalCarts();
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
      }

      if (e.target.classList.contains('quantity-minus')) {
        if (quantity > 1) {
          const updatedProduct = {
            ...product,
            quantity: product.quantity - 1,
          };
          dataCarts.products[productIndex] = updatedProduct;
          dataCarts.total -= product.price;
          cartRef.update({
            products: [...dataCarts.products],
            total: firebase.firestore.FieldValue.increment(-product.price),
          });
          quantityValue.textContent = updatedProduct.quantity;
          changeTotalCarts();
        }
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
      }
      if (directory == 'cart.html') {
        infoCartPage();
      }
    });
  });
}
export function handleDeleteProduct() {
  const deleteButtons = document.querySelectorAll(
    '.delete-product-mini_cart ion-icon'
  );
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton
        .closest('.item-mini_cart')
        .getAttribute('data-id');
      const productIndex = dataCarts.products.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex > -1) {
        const deletedProduct = dataCarts.products[productIndex];
        dataCarts.products.splice(productIndex, 1);
        dataCarts.total -= deletedProduct.price * deletedProduct.quantity;
        cartRef.update({
          products: [...dataCarts.products],
          total: dataCarts.total,
        });
        localStorage.setItem('countCarts', dataCarts.products.length);
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
        renderMiniCart();
      }
    });
  });
}

function renderCountItem() {
  const countItemE = document.querySelector('.count-item');
  const countItemE_mobile = document.querySelector(
    '.count-item_product_mobile'
  );
  const countCarts = localStorage.getItem('countCarts');

  if (countCarts) {
    countItemE.textContent = countCarts;
    countItemE_mobile.textContent = countCarts;
  } else if (dataCarts !== null && dataCarts !== undefined) {
    countItemE.textContent = dataCarts.products.length;
    countItemE_mobile.textContent = dataCarts.products.length;
  } else {
    countItemE.textContent = '0';
    countItemE_mobile.textContent = '0';
  }
}
function formattedPrice(price) {
  const formattedPrice = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formattedPrice.replace(/^(\D*)(\d+)(\D*)$/, (match, p1, p2, p3) => {
    return p1 + p2.replace(/\d{3}(?=\d)/g, '$&,') + p3;
  });
}
function changeTotalCarts() {
  const totalCarts = document.querySelector('.total_cart');
  totalCarts.innerHTML = '';
  totalCarts.insertAdjacentHTML(
    'beforeend',
    `
    Tổng tiền:
    <span class="price-total_cart">
    ${formattedPrice(dataCarts.total)}
    </span>
    `
  );
}
// CLICK DETAIL_PRODUCT

function clickDetailProductFromCart() {
  const imgProductCarts = document.querySelectorAll('.img-mini_cart');
  const nameProductCarts = document.querySelectorAll('.name-product-mini_cart');
  imgProductCarts.forEach((product) => {
    product.addEventListener('click', (e) => {
      const productId = product.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
  nameProductCarts.forEach((product) => {
    product.addEventListener('click', (e) => {
      const productId = product.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
}
function showAddToCart() {
  // Thêm sản phẩm vào giỏ hàng ở đây
  Swal.fire({
    icon: 'success',
    title: 'Đã thêm vào giỏ hàng!',
    showConfirmButton: false,
    timer: 1500,
  });
}
function pathNameCurrent() {
  var pathArray = window.location.pathname.split('/');
  var directory = pathArray[pathArray.length - 1];
  if (directory == 'index.html' || directory == '') return 'html/detail.html';
  return '../html/detail.html';
}
// ************************* render page cart.html

async function infoCartPage() {
  let storedDataCarts;
  const cartThreadE = document.querySelector('.cart-thread');
  const listItemCartE = document.querySelector('.list-item-cart');
  storedDataCarts = localStorage.getItem('dataCarts');
  const dataCarts_localStore = JSON.parse(storedDataCarts);
  sectionBuy(dataCarts_localStore);
  if (
    storedDataCarts !== 'null' &&
    storedDataCarts !== undefined &&
    dataCarts_localStore.total != 0
  ) {
    cartThreadE.innerHTML = `
      <div class="cart-thread_product">Sản phẩm</div>
                  <div class="cart-thread_price">Đơn giá</div>
                  <div class="cart-thread_count">Số lượng</div>
                  <div class="cart-thread_total">Tổng tiền</div>
                  <div class="cart-thread_delete">Xóa</div>`;
    listItemCartE.innerHTML = '';
    dataCarts_localStore.products.forEach((product) => {
      listItemCartE.insertAdjacentHTML(
        'beforeend',
        `
      <li class="item-cart" data-id ="${product.productId}">
                  <div class="img-cart-product">
                    <a class="img-cart" href="${pathNameCurrent()}"  data-id ="${
          product.productId
        }">
                      <img
                        alt="${product.name}"
                        src="${product.img}"
                      />
                    </a>
                    <div class="name-cart-product">
                    <a class="name-link-cart_product" href="${pathNameCurrent()}" data-id = "${
          product.productId
        }">
                    ${product.name}</div>
                    </a>
                  </div>
                  <div class="price-cart-product">${formattedPrice(
                    product.price
                  )}</div>
                  <div class="count-cart-product">
                    <button
                      class="quantity-button-cart quantity-minus-product"
                      type="button"
                    >
                      -
                    </button>
                    <div class="quantity-value-product">${
                      product.quantity
                    }</div>
                    <button
                      class="quantity-button-cart quantity-plus-product"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <div class="total-cart-product">${formattedPrice(
                    priceItemProduct(product.price, product.quantity)
                  )}</div>
                  <div class="delete-cart-product">
                    <ion-icon name="trash-outline" class="trash"></ion-icon>
                  </div>
                </li>`
      );
    });

    handleQuantityButtons_Page(dataCarts_localStore);
    clickDetailProductFromCart_Page();
    changeListToTalCart_Page(dataCarts_localStore.total);
    deleteItemProduct_page();
  } else {
    cartThreadE.innerHTML = `<span class='no-cart'>Không có sản phẩm nào.
    <a href="../index.html">Quay lại</a> cửa hàng để tiếp tục mua sắm</span>`;
    listItemCartE.innerHTML = '';
  }
}
function priceItemProduct(price, count) {
  return formattedPrice(price * count);
}
function isUserCart() {
  const headerCartE = document.querySelector('.header-cart_text');
  const btnCartE = document.querySelectorAll('.btn-card');
  console.log(btnCartE);
  const logoCartE = document.querySelector('.logo-cart');
  var pathArray = window.location.pathname.split('/');
  var directory = pathArray[pathArray.length - 1];

  if (infoUser) {
    if (directory == 'index.html' || directory == '') {
      headerCartE.href = 'html/cart.html';
      logoCartE.href = 'html/cart.html';
    } else {
      headerCartE.href = 'cart.html';
      logoCartE.href = 'cart.html';
    }
  } else {
    if (directory == 'index.html' || directory == '') {
      headerCartE.href = 'html/SignIn.html';
      logoCartE.href = 'html/SignIn.html';
      btnCartE.forEach((btnCart) => {
        btnCart.href = 'html/SignIn.html';
      });
    } else {
      headerCartE.href = 'SignIn.html';
      logoCartE.href = 'SignIn.html';

      btnCartE.forEach((btnCart) => {
        btnCart.href = 'SignIn.html';
      });
    }
  }
}
isUserCart();
function clickDetailProductFromCart_Page() {
  const imgProductCarts = document.querySelectorAll('.img-cart');
  const nameProductCarts = document.querySelectorAll('.name-link-cart_product');
  imgProductCarts.forEach((product) => {
    product.addEventListener('click', (e) => {
      const productId = product.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
  nameProductCarts.forEach((product) => {
    product.addEventListener('click', (e) => {
      const productId = product.getAttribute('data-id');
      localStorage.setItem('productId', productId);
    });
  });
}
function handleQuantityButtons_Page(dataCarts_localStore) {
  const quantityButtons = document.querySelectorAll('.quantity-button-cart');
  quantityButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const listItem = e.target.closest('.item-cart');
      const productId = listItem.getAttribute('data-id');
      if (dataCarts === undefined) {
        dataCarts = dataCarts_localStore;
        console.log('lay du lieu tu local?');
      }
      const productIndex = dataCarts.products.findIndex(
        (product) => product.productId === productId
      );
      const product = dataCarts.products[productIndex];
      const quantityValue = listItem.querySelector('.quantity-value-product');
      const quantity = parseInt(quantityValue.textContent);
      if (e.target.classList.contains('quantity-plus-product')) {
        const updatedProduct = {
          ...product,
          quantity: product.quantity + 1,
        };
        dataCarts.products[productIndex] = updatedProduct;
        dataCarts.total += product.price;
        cartRef.update({
          products: [...dataCarts.products],
          total: firebase.firestore.FieldValue.increment(product.price),
        });
        quantityValue.textContent = updatedProduct.quantity;
        changeTotalCarts();
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
        changeListToTalCart_Page(dataCarts.total);
        renderMiniCart();
        const totalItemProduct = listItem.querySelector('.total-cart-product');
        totalItemProduct.textContent = formattedPrice(
          priceItemProduct(updatedProduct.price, updatedProduct.quantity)
        );
      }

      if (e.target.classList.contains('quantity-minus-product')) {
        if (quantity > 1) {
          const updatedProduct = {
            ...product,
            quantity: product.quantity - 1,
          };
          dataCarts.products[productIndex] = updatedProduct;
          dataCarts.total -= product.price;
          cartRef.update({
            products: [...dataCarts.products],
            total: firebase.firestore.FieldValue.increment(-product.price),
          });
          quantityValue.textContent = updatedProduct.quantity;
          const totalItemProduct = listItem.querySelector(
            '.total-cart-product'
          );
          totalItemProduct.textContent = formattedPrice(
            priceItemProduct(updatedProduct.price, updatedProduct.quantity)
          );
          localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
          changeListToTalCart_Page(dataCarts.total);
          changeTotalCarts();
          renderMiniCart();
        }
      }
    });
  });
}
function sectionBuy(listTotalCart) {
  const containerBuyE = document.querySelector('.container-buy');
  containerBuyE.innerHTML = `
  <div class="total-list-product">
                <div class="text-total-product">
                  Tổng giá sản phẩm:
                  <span class="value-total-product">${formattedPrice(
                    listTotalCart.total
                  )}</span>
                </div>
                <div class="button-buy">
                  Tiến hành thanh toán
                  <ion-icon name="bag-check-outline"></ion-icon>
                </div>
              </div>
  `;
}
function changeListToTalCart_Page(price) {
  const valueTotal = document.querySelector('.value-total-product');
  valueTotal.textContent = formattedPrice(price);
}
export function addProductToCart_PageDetail() {
  console.log('t ko goi may ma');
  const btnAddProduct = document.querySelector('.btn-add_product');
  const countValueE = document.querySelector('.value-number');
  btnAddProduct.addEventListener('click', async (e) => {
    if (!infoUser) {
      window.location.href = 'SignIn.html';
    } else {
      const productId = btnAddProduct.getAttribute('data-id');
      const productChose = await productsCartChose(productId);
      var newProduct = {
        productId: productChose[0].id,
        name: productChose[0].name,
        price: productChose[0].price,
        quantity: 1,
        img: productChose[0].img,
      };
      const storedDataCarts = localStorage.getItem('dataCarts');
      const dataCarts_localStore = JSON.parse(storedDataCarts);
      if (dataCarts === undefined) {
        dataCarts = dataCarts_localStore;
        console.log('lay du lieu tu local?');
      }
      const existingProductIndex = dataCarts.products.findIndex((product) => {
        return product.productId === newProduct.productId;
      });
      if (existingProductIndex > -1) {
        const existingProduct = dataCarts.products[existingProductIndex];
        const countValue = parseInt(countValueE.value);
        console.log(countValueE);
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + countValue,
        };

        dataCarts.products[existingProductIndex] = updatedProduct;
        dataCarts.total += newProduct.price * countValue;
        cartRef.update({
          products: [...dataCarts.products],
          total: firebase.firestore.FieldValue.increment(newProduct.price),
        });
        localStorage.setItem('countCarts', dataCarts.products.length);
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
      } else {
        const countValue = parseInt(countValueE.value);
        const updatedProduct = {
          ...newProduct,
          quantity: countValue,
        };
        dataCarts.products.push(updatedProduct);
        dataCarts.total += updatedProduct.price * countValue;

        cartRef.update({
          products: firebase.firestore.FieldValue.arrayUnion(newProduct),
          total: firebase.firestore.FieldValue.increment(newProduct.price),
        });
        localStorage.setItem('countCarts', dataCarts.products.length);
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
      }
      renderMiniCart();
      showAddToCart();
    }
  });
}
function deleteItemProduct_page() {
  const iconTrashE = document.querySelectorAll('.trash');
  iconTrashE.forEach((iconTrash) => {
    iconTrash.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = iconTrash.closest('.item-cart').getAttribute('data-id');
      console.log(productId);
      const storedDataCarts = localStorage.getItem('dataCarts');
      const dataCarts_localStore = JSON.parse(storedDataCarts);
      if (dataCarts === undefined) {
        dataCarts = dataCarts_localStore;
        console.log('lay du lieu tu local?');
      }
      const productIndex = dataCarts.products.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex > -1) {
        const deletedProduct = dataCarts.products[productIndex];
        dataCarts.products.splice(productIndex, 1);
        dataCarts.total -= deletedProduct.price * deletedProduct.quantity;
        cartRef.update({
          products: [...dataCarts.products],
          total: dataCarts.total,
        });
        localStorage.setItem('countCarts', dataCarts.products.length);
        localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
        renderMiniCart();
        infoCartPage();
      }
    });
  });
}

export { dataCarts, cartRef };
