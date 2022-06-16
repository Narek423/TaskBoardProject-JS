import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database, storage } from "../components/firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { ArrAdminTools, ArrClientTools } from "../constants/Tools";
import {
  getDownloadURL,
  ref as resstore,
  uploadBytesResumable,
} from "firebase/storage";

export const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roll, setRoll] = useState(null);
  const [enabled, setEnabled] = useState(null);
  const dbRef = getDatabase();
  const [avatarLink, setAvatarLink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    console.log(email);
    return signInWithEmailAndPassword(auth, email, password).then(
      (currentUser) => {
        console.log("user", currentUser);
        setUser(currentUser);
      }
    );
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      setImgUrl("");
    };
  }, [user]);

  useEffect(() => {
    if (!!user?.accessToken) {
      // console.log("User",user)
      get(ref(dbRef, "users/" + user.uid))
        .then((snapshot) => {
          console.log("snapshot", snapshot.val().roll);
          setRoll(snapshot.val().roll);
          setEnabled(snapshot.val().enabled);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      getDownloadURL(resstore(storage, `${user.email}/avatar`))
        .then((url) => {
          setImgUrl(url);
          console.log(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const value = {
    user,
    email,
    imgUrl,
    signUp,
    signIn,
    avatarLink: avatarLink,
    logOut,
    toolsList: roll && roll === "Admin" ? ArrAdminTools : ArrClientTools,
    roll,
    enabled,
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
