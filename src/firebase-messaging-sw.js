importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyB-9fD6pq0a7yjziqoxGIdHhaZEC5m2KG8",
    authDomain: "utnhandrug.firebaseapp.com",
    projectId: "utnhandrug",
    storageBucket: "utnhandrug.appspot.com",
    messagingSenderId: "858505356345",
    appId: "1:858505356345:web:1f4cd825552f7620bc59e8",
    measurementId: "G-EVGX8S9C95"
})

const messaging = firebase.messaging();