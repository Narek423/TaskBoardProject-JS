import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Components/firebase";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState("");
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function signIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<UserAuthContext.Provider value={{ user, signUp, signIn }}>
			{children}
		</UserAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(UserAuthContext);
}
