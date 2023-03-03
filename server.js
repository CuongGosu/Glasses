const axios = require('axios');
const http = require('http');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const Postfirebase = require('./js/firebase');

const hostname = '127.0.0.1';
const port = '3000';

// sign up

function POST(data){
  Postfirebase.post('/account.json',data)
    .then(()=>{
      console.log("Đăng ký thành công");
    })
    .catch((err)=>{
      console.log(err);
    })
  }

fs.readFile(__dirname+'/html/FormSignUp.html','utf-8',(err,data)=>{
  const server = http.createServer((req,res)=>{
    let buffer = "";
    let decocder = new StringDecoder('utf-8');

    req.on('data',(data)=>{
      // console.log(data);
      buffer = buffer + decocder.write(data);
      console.log(buffer);
      let dataPost =  JSON.parse(buffer);
      console.log(dataPost);
      POST(dataPost);
    })

    req.on('end',()=>{
      buffer = buffer + decocder.end();
    })
    res.statusCode = 200 //success
    res.setHeader('Content-Type','html');
    res.end(data);
  })

  server.listen(port, hostname, ()=>{
    console.log(`server is running at: http://${hostname}:${port}/`);
  })
})

const { initializeApp } = require('firebase/app');
const { getAnalytics } = require("firebase/analytics");
const {getDatabase, ref, get, set, child, update, remove} = require("firebase/database")

const firebaseConfig = {
  apiKey: "AIzaSyCm2QJLmBu5Vy6Qs8uSGiPJhTYadIf6Vpc",
  authDomain: "glasses-store-fd757.firebaseapp.com",
  databaseURL: "https://glasses-store-fd757-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "glasses-store-fd757",
  storageBucket: "glasses-store-fd757.appspot.com",
  messagingSenderId: "882652660321",
  appId: "1:882652660321:web:e17abc2cde7135fba72020",
  measurementId: "G-5XNB6Q8Q3L"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
get(child(dbRef,`account`))
  .then((snapshot)=>{
    if(snapshot.exists()){
      console.log(snapshot.val());
    }
    else{
      console.log("không có data")
    }
  })
  .catch((err)=>{
    console.error(err);
  })