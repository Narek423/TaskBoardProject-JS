import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useUserAuth } from "../context/UserAuthContext";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeMdajQ5RYUmEj6bxOcsVUYZYlFz55sKA",
  authDomain: "taskboardproject-3dd1f.firebaseapp.com",
  databaseURL: "https://taskboardproject-3dd1f-default-rtdb.firebaseio.com",
  projectId: "taskboardproject-3dd1f",
  storageBucket: "taskboardproject-3dd1f.appspot.com",
  messagingSenderId: "1021091163244",
  appId: "1:1021091163244:web:5eeeb99edf48dec361fc49",
  measurementId: "G-7SS21PZV79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export function signup(
  email,
  password,
  name,
  lastName,
  dateOfBirth,
  phoneNumber,
  taxCode,
  roll,
  enabled
) {
  console.log(email, password);
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      writeUserData(
        user,
        password,
        name,
        lastName,
        dateOfBirth,
        phoneNumber,
        taxCode,
        roll,
        enabled
      );
    }
  );
}

export function writeUserData(
  user,
  password,
  name,
  lastName,
  dateOfBirth,
  phoneNumber,
  taxCode,
  roll,
  enabled,
  avatar = "https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
) {
  set(ref(database, "users/" + user.uid), {
    avatar,
    name,
    lastName,
    dateOfBirth,
    phoneNumber,
    taxCode,
    roll,
    enabled,
  });
}

export function writeUserTask(
  userId,
  name,
  email,
  imageUrls,
  titleValue,
  nodesValue,
  descrpValue,
  date
) {
  const db = getDatabase();
  set(ref(db, "task/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrls,
    title: titleValue,
    nodes: nodesValue,
    descrp: descrpValue,
    date: date,
  });
}

export async function signin(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      const dbRef = ref(getDatabase());
      return get(child(dbRef, `users/${userId}`)).then((snep) => snep.val());
    }
  );
}
