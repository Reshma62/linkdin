
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjBI9RYIXrkczChjEpXph-LyY8GJnLyhw",
  authDomain: "linkdin-clone-89035.firebaseapp.com",
  projectId: "linkdin-clone-89035",
  storageBucket: "linkdin-clone-89035.appspot.com",
  messagingSenderId: "864321879174",
  appId: "1:864321879174:web:de78c8b5c3be2767f02507",
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
export const auth = getAuth(app);

export default firebaseConfig;

