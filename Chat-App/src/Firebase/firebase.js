import { initializeApp } from "firebase/app";
import { getAuth,} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDClLrazSqRr3ZYW9aaOqvasU5S3dE3Z0o",
  authDomain: "reduc-chat-app.firebaseapp.com",
  projectId: "reduc-chat-app",
  storageBucket: "reduc-chat-app.firebasestorage.app",
  messagingSenderId: "250231438028",
  appId: "1:250231438028:web:28585b07a8aec0f21e2069",
  measurementId: "G-Y394K4DS6M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);