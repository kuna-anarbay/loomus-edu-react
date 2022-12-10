import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBZx9uhiefvO8yaj4SRkTYTjhTKMFU8QOk",
    authDomain: "loomus-edu.firebaseapp.com",
    projectId: "loomus-edu",
    storageBucket: "loomus-edu.appspot.com",
    messagingSenderId: "716956793832",
    appId: "1:716956793832:web:777f40e94337c62820c25d",
    measurementId: "G-GMD1P33BWJ"
};


export let app: FirebaseApp
if (!getApps().length) {
    app = initializeApp(firebaseConfig)
} else {
    app = getApp();
}

export const analytics = () => {
    if (typeof window !== "undefined") {
        return getAnalytics(app);
    } else {
        return null
    }
}

export default firebaseConfig;