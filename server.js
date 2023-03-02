
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm2QJLmBu5Vy6Qs8uSGiPJhTYadIf6Vpc",
  authDomain: "glasses-store-fd757.firebaseapp.com",
  projectId: "glasses-store-fd757",
  storageBucket: "glasses-store-fd757.appspot.com",
  messagingSenderId: "882652660321",
  appId: "1:882652660321:web:e17abc2cde7135fba72020",
  measurementId: "G-5XNB6Q8Q3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  

var port = 1000
app.listen(port);
console.log("server is running at port: ",port);
