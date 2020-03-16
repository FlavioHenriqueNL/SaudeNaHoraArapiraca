import firebase from 'firebase';
let firebaseConfig = {
  apiKey: "AIzaSyCyubLrc3R4WJj6CZf70MKVCdew9RNuRus",
  authDomain: "saudenahoraara.firebaseapp.com",
  databaseURL: "https://saudenahoraara.firebaseio.com",
  projectId: "saudenahoraara",
  storageBucket: "saudenahoraara.appspot.com",
  messagingSenderId: "351318488110",
  appId: "1:351318488110:web:f7c0af2b61955bae7a5bbf",
  measurementId: "G-4Y3WKXL10R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

//Teste de commit 2.
