// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };
// firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const auth = firebase.auth();
// const database = firebase.database();
const formSignUp = document.querySelector('.form-SignUp');
formSignUp.onsubmit = (e) => {
  e.preventDefault();
};
function register() {
  // preventDefault();
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
      return;
    } else {
      console.log(inputElement);
      console.log('sai 1', validate_field(inputElement));
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
    console.log('sai');
    return;
  } else {
    console.log('sai');

    errorMessage.innerText = '';
    parentElement.classList.remove('invalid');
  }
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
