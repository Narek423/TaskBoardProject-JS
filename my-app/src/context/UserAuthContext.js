import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database, storage } from "../components/firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  AdminTools,
  ClientTools,
} from "../components/UserProfile/ToolsNavBar/GetToolsList";
import {
  getDownloadURL,
  ref as resstore,
  uploadBytesResumable,
} from "firebase/storage";
import Rolls from "../constants/Rolls";
import { Navigate } from "react-router-dom";
import paths from "../constants/Paths";
import { RiContactsBookLine } from "react-icons/ri";

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
  const [title, setTitle] = useState("");
  const [typography, setTypography] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { Admin } = Rolls;
  const { USER_PROFILE_PATH } = paths;

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
