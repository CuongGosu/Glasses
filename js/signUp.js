var API = "http://localhost:3000/account";
//sign up
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

  function addDataRegister(){
    var regisForm = document.querySelector(".Sign-Up-Form");
    regisForm.onsubmit = (e) => {
      e.preventDefault();
      var userName = document.querySelector("#username").value;
      var pass = document.querySelector("#password").value;
      var confirmPass = document.querySelector("#Confirm-password").value;
      var firstName = document.querySelector("#firstName").value;
      var lastName = document.querySelector("#lastName").value;      
     if(pass =="" || userName=="" || firstName=="" || lastName=="") alert("Thiếu thông tin đăng ký");
     else if(confirmPass != pass) alert("password phải trùng với Confirm password");
      else if(checkUserName(userName)) alert("tên đăng nhập đã bị trùng");
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











  //////////////////////////////////////////////////////
  import axios from 'axios';
  export default axios.create({
    baseURL: "https://glasses-store-fd757-default-rtdb.asia-southeast1.firebasedatabase.app/"
  })