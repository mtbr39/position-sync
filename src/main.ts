import { createApp } from "vue";
import App from "./App.vue";
// import App2 from "./App2.vue";
// import PositionSyncApp from "./PositionSyncApp.vue";

createApp(App).mount("#app");
// createApp(App2).mount("#app2");
// createApp(PositionSyncApp).mount("#position-sync-app");

console.log("Hello main.ts")

import firebase from 'firebase';

const firebaseConfig = {

};

const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();

db.ref("/test725").child("test").update({
    test: "yeah",
});
