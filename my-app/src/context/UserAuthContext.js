import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../components/firebase";
import { getDatabase, ref, get } from "firebase/database";
import { getDownloadURL, ref as resstore } from "firebase/storage";

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
  const [userData, setUserData] = useState();

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      setImgUrl(""); //  urish kerpov datan poxel
    };
  }, [user]);

  useEffect(() => {
    if (!!user?.accessToken) {
      get(ref(dbRef, "users/" + user.uid))
        .then((snapshot) => {
          setRoll(snapshot.val().roll);
          setEnabled(snapshot.val().enabled);
          setUserData(snapshot.val());
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dbRef, user]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      getDownloadURL(resstore(storage, `${user.email}/avatar`))
        .then((url) => {
          setImgUrl(url);
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
    roll,
    enabled,
    userData,
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
