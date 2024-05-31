import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeQaTatH0W0laqt6Se_mf9Wlsz3D-TV-s",
  authDomain: "fire-images-65561.firebaseapp.com",
  projectId: "fire-images-65561",
  storageBucket: "fire-images-65561.appspot.com",
  messagingSenderId: "1081178281251",
  appId: "1:1081178281251:web:d1d6647e0634996f6f2896",
  measurementId: "G-K9Y11BNZND"
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app)