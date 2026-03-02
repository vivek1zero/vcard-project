import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgcwoS8i3EN-F1q-l-TYcPcrwvsOEhpMY",
  authDomain: "vcard-master.firebaseapp.com",
  projectId: "vcard-master",
  storageBucket: "vcard-master.firebasestorage.app",
  messagingSenderId: "121481324649",
  appId: "1:121481324649:web:2ec10819011cde78775af8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
