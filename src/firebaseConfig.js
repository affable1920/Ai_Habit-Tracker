import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCuotpA3Bnsh3Ez_a1Fp7GY3VrUbNs_9d8",
  authDomain: "react-vite-305eb.firebaseapp.com",
  projectId: "react-vite-305eb",
  storageBucket: "react-vite-305eb.firebasestorage.app",
  messagingSenderId: "264391416659",
  appId: "1:264391416659:web:fa648e95e5bb0ab3dd9fa6",
  measurementId: "G-G8KSXJ5Q1S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
