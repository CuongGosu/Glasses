var API = "http://localhost:3000/account";
// login
function Validator(formSelector) {
    var formElement = document.querySelector(formSelector);
    var formInputElement = {};
    var inputElements = formElement.querySelectorAll(".input-validator-auth");
    formElement.onsubmit = (e) => {
      e.preventDefault();
      for (var input of inputElements) {
        formInputElement[input.id] = input.value;
      }
      fetch(API)
        .then((res) => res.json())
        .then((databases) => {
          const equal = databases.find((data) => {
            if (
              data.userName == formInputElement.username &&
              data.password == formInputElement.password 
            )
              return true;
            return false;
          });
  
          if (equal) {
            alert("Đăng nhập thành công!");
            window.location.replace("index.html");
        }
          else alert("Đăng nhập thất bại!!!");
        });
    };
  }
function start() {
    Validator(".validator");
  }
  start();
  