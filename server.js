import axios from 'axios'
import http from'http';
import fs from'fs';
import Postfirebase from './js/firebase.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hostname = 'localhost';
const port = '1212';

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

    req.on('data',(data)=>{
      // console.log(data);
      buffer = buffer + data.decode('utf-8')
      // console.log(buffer);
      let dataPost =  JSON.parse(buffer);
      // console.log(dataPost);
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

fs.readFile(__dirname+'/html/FormSignIn.html','utf-8',(err,data)=>{
  const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
    server.listen(port);
  })
})
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getDatabase, ref, get, set, child, update, remove} from "firebase/database";

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
      // console.log(snapshot.val());
    }
    else{
      console.log("không có data")
    }
  })
  .catch((err)=>{
    console.error(err);
  })