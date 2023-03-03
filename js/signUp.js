var API = "http://localhost:3000/account";






// const { getDatabase, ref, set } = require("firebase/database");
// const { response } = require("express");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM(``).window.document;
// var btn = global.document.getElementById('register-btn');
// console.log(btn);



// sign up = fetch()
function POST(data){
    var response  = {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
      };
    fetch(API,response)
      .then((res) => res.json())
      .then(()=>{
        alert("Đăng ký thành công");
      })
      .catch(()=>{
        alert("Đăng ký thất bại\nSố ID đã có người đăng ký");
      })
  }

// post data to database
  function addDataRegister(){
    var regisForm = global.document.querySelector(".Sign-Up-Form");
    regisForm.onsubmit = (e) => {
      e.preventDefault();
      var userName = global.document.querySelector("#username").value;
      var pass = global.document.querySelector("#password").value;
      var confirmPass = global.document.querySelector("#Confirm-password").value;
      var firstName = global.document.querySelector("#firstName").value;
      var lastName = global.document.querySelector("#lastName").value;      
     if(pass =="" || userName=="" || firstName=="" || lastName=="") alert("Thiếu thông tin đăng ký");
     else if(confirmPass != pass) alert("password phải trùng với Confirm password");
      // else if(checkUserName(userName)) alert("tên đăng nhập đã bị trùng");
        else {
            var id = Math.floor(Math.random() * 100);
          var regisData ={
            id: id,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: pass
          }
          POST(regisData);
          }    
    }
  }


  //check username trùng
function checkUserName(username){
  fetch(API)
    .then(res => res.json())
    .then((database) => {
      const equal = database.find(data =>{
        if(data.userName == username) 
          return true;
        return false;
      })
      if(equal)
      return true;
    else return false; 
      })     
}

addDataRegister();









