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
const dbCart_ref = firebase.firestore();
// Initialize Firebase
const auth = firebase.auth();
const database = firebase.database();
const formSignUp = document.querySelector('.form-SignUp');
formSignUp.onsubmit = (e) => {
  e.preventDefault();
  document.getElementById('overlay').style.display = 'block';
  register();
};
function register() {
  const email = document.getElementById('fullEmail');
  const password = document.getElementById('password');
  const confirm_password = document.getElementById('confirm_password');
  const formInput = document.querySelectorAll('.form-input');
  let checkRule = [];
  formInput.forEach((form_group) => {
    var errorMessage = form_group.querySelector('.form-message');
    const inputElement = form_group.querySelector('input');
    if (validate_field(inputElement) == false) {
      checkRule[inputElement.id] = true;
      errorMessage.innerHTML = `${inputElement.name} không được để trống`;
      form_group.classList.add('invalid');
      inputElement.focus();
      document.getElementById('overlay').style.display = 'none';

      return;
    } else {
      checkRule[inputElement.id] = false;
      errorMessage.innerHTML = '';
      form_group.classList.remove('invalid');
    }
  });
  var parentElement, errorMessage;
  parentElement = email.closest('.form-input');
  errorMessage = parentElement.querySelector('.form-message');
  if (checkRule[email.id]) return;
  if (!validate_email(email)) {
    errorMessage.innerHTML = 'Email vừa nhập không đúng định dạng';
    parentElement.classList.add('invalid');
    email.focus();
    document.getElementById('overlay').style.display = 'none';

    return;
  } else {
    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
  parentElement = password.closest('.form-input');
  errorMessage = parentElement.querySelector('.form-message');
  if (checkRule[password.id]) return;
  if (!validate_password(password)) {
    errorMessage.innerHTML = 'Mật khẩu không được ngắn hơn 6 kí tự';
    parentElement.classList.add('invalid');
    password.focus();
    document.getElementById('overlay').style.display = 'none';

    return;
  } else {
    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
  parentElement = confirm_password.closest('.form-input');
  errorMessage = parentElement.querySelector('.form-message');
  if (checkRule[confirm_password.id]) return;
  if (!validate_confirm_password(confirm_password, password)) {
    errorMessage.innerHTML = 'Mật khẩu xác nhận không khớp';
    parentElement.classList.add('invalid');
    confirm_password.focus();
    document.getElementById('overlay').style.display = 'none';

    return;
  } else {
    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
  document.getElementById('loading-animation').style.display = 'block';
  // AUTHENTICATION
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(async function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        email: email.value,
        password: password.value,
        last_login: Date.now(),
      };
      var userPromise = database_ref.child('users/' + user.uid).set(user_data);
      var cartRef = dbCart_ref.collection('carts').doc(user.uid);
      var cartPromise = cartRef.set({
        products: [],
        total: 0,
      });
      await Promise.all([cartPromise, userPromise]);
      document.getElementById('loading-animation').style.display = 'none';
      document.getElementById('success-message').style.display = 'flex';
      setTimeout(() => {
        window.location.href = 'SignIn.html';
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
      }, 1300);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode);
    });
}
// VALIDATOR
function validate_email(inputEmail) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.value.match(mailformat)) {
    return true;
  }
  return false;
}
function validate_password(inputPassword) {
  if (inputPassword.value.length < 6) {
    return false;
  }
  return true;
}
function validate_confirm_password(confirm_password, password) {
  if (confirm_password.value != password.value) {
    return false;
  }
  return true;
}
function validate_field(inputText) {
  if (inputText.value.trim() == '') {
    return false;
  }
  if (inputText.value.length <= 0) {
    return false;
  }
  return true;
}
