// FIREBASE
import { getDataProducts } from './dataAPI.js';
var dataProducts;
dataProducts = await getDataProducts();
var cartRef, dataCarts;
renderInfoCartsFirst();
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
  cartRef = firebase.firestore().collection('carts').doc(userID);
  const dataDoc = await cartRef.get();
  dataCarts = dataDoc.data();
  renderMiniCart(userID);
  addProductCart(userID);
}
async function productsCartChose(id_product) {
  return dataProducts.filter((item) => {
    return item.id == id_product;
  });
}
// CLICK ADD PRODUCT CAR

function addProductCart(userID) {
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
        console.log('trung r');
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
        console.log('them moi');
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
function handleQuantityButtons() {
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
      }
    });
  });
  localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
}
function handleDeleteProduct() {
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
        renderMiniCart();
      }
    });
  });
  localStorage.setItem('dataCarts', JSON.stringify(dataCarts));
}

function renderCountItem() {
  const countItemE = document.querySelector('.count-item');
  const countCarts = localStorage.getItem('countCarts');
  if (countCarts) countItemE.textContent = countCarts;
  else if (dataCarts.products.length != null) {
    countItemE.textContent = dataCarts.products.length;
  }
}
function renderInfoCartsFirst() {
  const storedDataCarts = localStorage.getItem('dataCarts');
  const countItemE = document.querySelector('.count-item');
  const listCartItem = document.querySelector('.list-item-mini_cart');
  const viewInfoCart = document.querySelector('.view-info-cart');
  const dataCarts_localStore = JSON.parse(storedDataCarts);
  if (storedDataCarts) {
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
  clickDetailProductFromCart();
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
  if (directory == 'index.html') return 'html/detail.html';
  return '../html/detail.html';
}
