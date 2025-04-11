import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import addUserToDB from "../Utils/registerUser";
import { GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
export const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

async function register(data) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(user, { displayName: data.username });
    user.reload();

    const docRef = doc(firestore, "users", user.uid);
    const userToRegister = addUserToDB(user.toJSON());

    await setDoc(docRef, userToRegister);
  } catch (err) {
    throw handleAuthError(err.code);
  }
}

function handleAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return new Error("Email is already in use !");

    case "auth/invalid-email":
      return new Error("Invalid Email !");

    case "auth/weak-password":
      return new Error("Password is too weak !");

    default:
      return new Error("Registration failed!");
  }
}

async function login(data) {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (err) {
    throw Error("Invalid Credentials !");
  }
}

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function logout() {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
}

export default { auth, firestore, register, login, logout, loginWithGoogle };
