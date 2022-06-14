import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUserAuth } from "../../../context/UserAuthContext";
import avatar from "../../../Images/avatar/avatar.jpg"

const useStyle = createUseStyles(() => {
  return {
    avatar: {
      width: "100%",
      flex: 1,
      textAlign: "center",
      margin: {
        top: 30,
      },
    },
    useremail: {
      color: "#B4C8EC",
      width: "100%",
      fontSize: "100%",
      fontFamily: "cursive",
    },
    img: {
      width: "40%",
      borderRadius: 65,
    },
  };
});

function Avatar() {
  const { user,email,imgUrl} = useUserAuth();
  const classes = useStyle();
  // const [imgUrl, setImgUrl] = useState("");

  // useEffect(() => {
  //   if(user?.email){
  //   getDownloadURL(ref(storage, `${props.email}/avatar`))
  //     .then((url) => {
  //       setImgUrl(url);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }, [user]);

  return (
    <div className={classes.avatar}>
      <img className={classes.img} alt="avatar" src={imgUrl ? imgUrl : avatar}></img>
      <p className={classes.useremail}>{email}</p>
    </div>
  );
}
export default Avatar;
