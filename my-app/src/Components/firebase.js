import { initializeApp } from "firebase/app";
import * as firebase from "./firebase"
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import {
	getDatabase,
	ref,
	set,
	onValue,
	Database,
	get,
	child,
} from "firebase/database";
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
const auth = getAuth(app)
const analytics = getAnalytics(app);
const database = getDatabase(app);
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
	return createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			const user = userCredential.user;
			writeUserData(
				user,
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

function writeUserData(user, name, lastName, dateOfBirth, avatar) {
	set(ref(database, "users/" + user.uid), {
		email: user.email,
		name: name,
		lastName: lastName,
		dateOfBirth: dateOfBirth,
		avatar: avatar,
	});
}

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

