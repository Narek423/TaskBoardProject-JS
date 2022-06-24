import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import States from "../constants/States";
import Statuses from "../constants/Statuses";

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

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export function signup(userData) {
  return createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  ).then((userCredential) => {
    const user = userCredential.user;
    userData.user = user;
    writeUserData(userData);
  });
}

export function writeUserData(userData) {
  let {
    user,
    username,
    name,
    lastName,
    dateOfBirth,
    phoneNumber,
    taxCode,
    roll,
    email,
    enabled,
    avatar,
  } = userData;
  set(ref(database, "users/" + user.uid), {
    name,
    lastName,
    username,
    email,
    dateOfBirth,
    phoneNumber,
    taxCode,
    roll,
    enabled,
    avatar,
  });
}

export function writeUserTask(
  userId,
  urls,
  titleValue,
  nodesValue,
  descrpValue,
  date,
  filesUID
) {
  const db = getDatabase();
  set(ref(db, "tasks/" + uuidv4()), {
    clientId: userId,
    files: urls,
    title: titleValue,
    notes: nodesValue,
    description: descrpValue,
    creationDate: date,
    state: States.evaluation,
    status: Statuses[0],
    filesUID: filesUID,
    quantity: 0,
    costForUnit: 0,
  });
}

export async function editTasksData(title, description, notes, id) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  let editedRow = await get(child(dbRef, "tasks/" + id));
  editedRow = editedRow.val();

  set(ref(db, `tasks/${id}`), {
    ...editedRow,
    title,
    description,
    notes,
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
