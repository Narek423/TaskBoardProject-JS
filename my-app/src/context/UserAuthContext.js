import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database, storage } from "../Components/firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { ArrAdminTools, ArrClientTools } from "../Components/constants/Tools";
import { getDownloadURL, ref as resstore, uploadBytesResumable } from "firebase/storage";

export const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rull, setRull] = useState(null);
  const dbRef = getDatabase();
  const [avatarLink, setAvatarLink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [email,setEmail] = useState();

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
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!!user?.accessToken) {
      // console.log("User",user)
      get(ref(dbRef, "users/" + user.uid))
        .then((snapshot) => {
          console.log("snapshot", snapshot.val().roll);
          setRull(snapshot.val().roll);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if(user?.email){
      setEmail(user.email)
    getDownloadURL(resstore(storage, `${user.email}/avatar`))
    .then((url) => {
      setImgUrl(url);
      console.log(url)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  },[user])

  const value = {
    user,
    email,
    imgUrl,
    signUp,
    signIn,
    avatarLink: avatarLink,
    logOut,
    toolsList: rull && rull === "Admin" ? ArrAdminTools : ArrClientTools,
    rull,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
