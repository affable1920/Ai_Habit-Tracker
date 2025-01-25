import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import addUserToDB from "../Utils/registerUser";

const auth = getAuth(app);
const firestore = getFirestore(app);

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
    throw err;
  }
}

async function login(data) {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (err) {
    throw err;
  }
}

async function logout() {
  await signOut(auth);
}

export default { auth, firestore, register, login, logout };
