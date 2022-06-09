import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database } from "../Components/firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { ArrAdminTools, ArrClientTools } from "../Components/constants/Tools";

export const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rull, setRull] = useState(null);
  const dbRef = getDatabase();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (currentUser) => {
        setUser(currentUser);
      }
    );
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    // durs hanel  onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(`useEffect`, currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("useEffect")
    if (!!user) {
      get(ref(dbRef, "users/" + user.uid))
        .then((snapshot) => {
          setRull(snapshot.val().roll);
          console.log(snapshot.val());
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },[user]);

  
   const value = { user, signUp, signIn, logOut, toolsList: rull && rull === "Admin" ? ArrAdminTools : ArrClientTools,rull};

  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
