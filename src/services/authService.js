import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";

const auth = getAuth(app);
const database = getFirestore(app);

async function register(data) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(user, { displayName: data.username });
    user.reload();

    const docRef = doc(database, "users", user.displayName);
    await setDoc(docRef, {
      id: user.uid,
      teams: [],
      tasks: [],
      ...data,
    });
  } catch (err) {
    throw new Error(err?.message);
  }
}

async function login(data) {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (err) {
    throw new Error(err?.message);
  }
}

export default { auth, database, register, login };
