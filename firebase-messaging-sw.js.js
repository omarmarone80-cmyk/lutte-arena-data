// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB9vvCZd_vzxdipkKnSh7TAYNu4IHMOFaQ",
  authDomain: "lutte-arena.firebaseapp.com",
  projectId: "lutte-arena",
  storageBucket: "lutte-arena.firebasestorage.app",
  messagingSenderId: "616045902205",
  appId: "1:616045902205:web:c03f5c891ef5bbc722b414"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Notification reçue en arrière-plan:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/lutte-arena-data/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});