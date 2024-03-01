import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK-28OaLf2UbDrRDuRry6iTGhQt2hYL04",
  authDomain: "shopify-2beb0.firebaseapp.com",
  projectId: "shopify-2beb0",
  storageBucket: "shopify-2beb0.appspot.com",
  messagingSenderId: "1096656889043",
  appId: "1:1096656889043:web:585ec0ebf3ee3e58c8e026",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
