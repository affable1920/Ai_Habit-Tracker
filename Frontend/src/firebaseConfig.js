import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnSGqbRGo0gc3rjvoVUn6IXFNP0MuGiFo",
  authDomain: "habit-ai-c6477.firebaseapp.com",
  databaseURL: "https://habit-ai-c6477-default-rtdb.firebaseio.com",
  projectId: "habit-ai-c6477",
  storageBucket: "habit-ai-c6477.firebasestorage.app",
  messagingSenderId: "315137954203",
  appId: "1:315137954203:web:17e892e28935124b57d13e",
};

const app = initializeApp(firebaseConfig);
export default app;
