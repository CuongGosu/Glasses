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
// GET API PRODUCT
const productID = JSON.parse(localStorage.getItem('currentProductId'));
console.log(productID);
// Xóa thông tin sản phẩm khỏi localStorage
localStorage.removeItem('currentProductId');
