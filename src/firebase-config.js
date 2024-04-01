import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDt4WNd5YpFbQ7PpZ_rrlp0H4EvAAs_O3M",
    authDomain: "labwork-78eb5.firebaseapp.com",
    projectId: "labwork-78eb5",
    storageBucket: "labwork-78eb5.appspot.com",
    messagingSenderId: "892414898603",
    appId: "1:892414898603:web:f7942d05f436f6e2f6a2ee",
    measurementId: "G-3TEDE934NV"
  };

  const app = initializeApp(firebaseConfig);

  export const firebaseAuth = getAuth(app);