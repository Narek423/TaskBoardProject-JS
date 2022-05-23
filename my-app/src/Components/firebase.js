// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	getDatabase,
	ref,
	set,
	onValue,
	Database,
	get,
	child,
} from "firebase/database";
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
const analytics = getAnalytics(app);
const database = getDatabase(app);

export function signup(
	email,
	password,
	userName,
	phoneNumber,
	taxCode,
	roll,
	enabled
) {
	return createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			const user = userCredential.user;
			writeUserData(user, name, lastName, dateOfBirth, avatar);
		}
	);
}

function writeUserData(user, name, lastName, dateOfBirth, avatar) {
	set(ref(database, "users/" + user.uid), {
		username: user.displayName,
		email: user.email,
		name: name,
		lastName: lastName,
		dateOfBirth: dateOfBirth,
		avatar: avatar,
	});
}
// async function getUserData(user) {
// 	const userId = user.uid;
// 	let value = await get(
// 		ref(database, "/users/" + userId),
// 		(v) => {
// 			let userValue = v.val();
// 			// console.log(userValue);
// 		},
// 		{
// 			onlyOnce: true,
// 		}
// 	);
// 	console.log(value);
// }

export async function signin(email, password, val) {
	console.log("entered");
	return signInWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			const user = userCredential.user;
			const userId = user.uid;
			const dbRef = ref(getDatabase());
			return get(child(dbRef, `users/${userId}`)).then((snep) => snep.val());
		}
	);
}

// ("https://www.youtube.com/watch?v=jCY6DH8F4oc");
