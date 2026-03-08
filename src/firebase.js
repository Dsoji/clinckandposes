import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDsRjxfP0xxP67b7Oj0G3Njio2rQXcHbFA",
    authDomain: "clickandposes.firebaseapp.com",
    projectId: "clickandposes",
    storageBucket: "clickandposes.firebasestorage.app",
    messagingSenderId: "578422181658",
    appId: "1:578422181658:web:61e4b0b2e8601d28d8e6a3",
    measurementId: "G-DJ0REJD5RW",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
