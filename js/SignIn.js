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

// Initialize Firebase
const auth = firebase.auth();
const database = firebase.database();
const formSignIn = document.querySelector('.form-SignIn');
formSignIn.onsubmit = (e) => {
  e.preventDefault();
  login();
};
function login() {
  const email = document.getElementById('fullEmail');
  const password = document.getElementById('password');
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
      return;
    } else {
      checkRule[inputElement.id] = false;
      errorMessage.innerHTML = '';
      form_group.classList.remove('invalid');
    }
  });
  if (checkRule[email.id]) return;
  var parentElement, errorMessage;
  parentElement = email.closest('.form-input');
  errorMessage = parentElement.querySelector('.form-message');
  if (!validate_email(email)) {
    errorMessage.innerHTML = 'Email vừa nhập không đúng định dạng';
    parentElement.classList.add('invalid');
    email.focus();
    return;
  } else {
    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
  if (checkRule[password.id]) return;
  parentElement = password.closest('.form-input');
  errorMessage = parentElement.querySelector('.form-message');
  if (!validate_password(password)) {
    errorMessage.innerHTML = 'Mật khẩu không được ngắn hơn 6 kí tự';
    parentElement.classList.add('invalid');
    password.focus();
    return;
  } else {
    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
  // AUTHENTICATION
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(function () {
      var user = auth.currentUser;
      // add this user to Firebase database
      var database_ref = database.ref();
      // creater user data
      var user_data = {
        last_login: Date.now(),
      };
      database_ref.child('users/' + user.uid).update(user_data);
      alert('Đăng nhập thành công!');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}
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
function validate_field(inputText) {
  if (inputText.value.trim() == '') {
    return false;
  }
  if (inputText.value.length <= 0) {
    return false;
  }
  return true;
}
