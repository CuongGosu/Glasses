const express = require('express');
const app = express();
const path = require('path');
const AccountModel = require

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


app.get('/html/FormSign*',(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'html/FormSignIn.html'))
})

app.post('/',(req,res,next=>{
  var username =  req.body.username;
  var password = req.body.password;
}))

app.listen(3000);
