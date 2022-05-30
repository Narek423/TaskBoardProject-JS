import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useUserAuth } from "../context/UserAuthContext";

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

export default app;

// import { getDatabase, ref, set, get, child } from "firebase/database";
// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// const database = getDatabase(app);

// export function signup(
// 	email,
// 	password,
// 	name,
// 	lastName,
// 	dateOfBirth,
// 	phoneNumber,
// 	taxCode,
// 	roll,
// 	enabled
// ) {
// 	console.log(email, password);
// 	return createUserWithEmailAndPassword(auth, email, password).then(
// 		(userCredential) => {
// 			const user = userCredential.user;
// 			writeUserData(
// 				user,
// 				password,
// 				name,
// 				lastName,
// 				dateOfBirth,
// 				phoneNumber,
// 				taxCode,
// 				roll,
// 				enabled
// 			);
// 		}
// 	);
// }

// function writeUserData(
// 	user,
// 	password,
// 	name,
// 	lastName,
// 	dateOfBirth,
// 	phoneNumber,
// 	taxCode,
// 	roll,
// 	enabled,
// 	avatar = "https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
// ) {
// set(ref(database, "users/" + user.uid), {
// 	email: user.email,
// 	avatar,
// 	name,
// 	lastName,
// 	dateOfBirth,
// 	phoneNumber,
// 	taxCode,
// 	roll,
// 	enabled,
// });
// }

// export async function signin(email, password) {
// 	console.log("entered");
// 	return signInWithEmailAndPassword(auth, email, password).then(
// 		(userCredential) => {
// 			const user = userCredential.user;
// 			const userId = user.uid;
// 			const dbRef = ref(getDatabase());
// 			return get(child(dbRef, `users/${userId}`)).then((snep) => snep.val());
// 		}
// 	);
// }
