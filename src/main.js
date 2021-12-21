import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import {
    browserLocalPersistence,
    getAuth,
    setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);

const db = getFirestore(firebaseApp);

export { auth, db };

let app;
auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App);
        app.config.compilerOptions.isCustomElement = (tag) =>
            tag.startsWith("google-pay");
        app.use(store);
        app.use(router);
        app.mount("#app");
    }
});
