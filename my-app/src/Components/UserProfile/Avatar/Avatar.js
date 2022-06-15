import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useUserAuth } from "../../../context/UserAuthContext";
import avatar from "../../../Images/avatar/avatar.jpg"
import { useNavigate } from "react-router-dom";
import paths from "../../../constants/Paths"

const useStyle = createUseStyles(() => {
  return {
    avatar: {
      // width: "100%",
      flex: 1,
      margin: 'auto',
      textAlign: "center",
      marginTop: "10%",
      display: "flex",
      flexDirection: 'column'
    },
    avatarClose: {
      width: "100%",
      flex: 1,
      textAlign: "center",
      marginTop: "30%"
    },
    useremail: {
      color: "#B4C8EC",
      fontSize: "100%",
      fontFamily: "cursive",
      flex: 1
    },
    img: {
      width: "15vh",
      borderRadius: 65,
      flex: 1,
      margin: 'auto' 
   },
    imgClose: {
      width: "65%",
      borderRadius: 65,
    }
  };
});

function Avatar(props) {
  const { user,email,imgUrl} = useUserAuth();
  const classes = useStyle();
  const navigate = useNavigate();
  const {open} = props;
  const {PROFILE_PATH,USER_PROFILE_PATH} = paths;
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
    <div className={open ? classes.avatar : classes.avatarClose}>
      <img onClick={() => navigate(`${PROFILE_PATH}${USER_PROFILE_PATH}`)} className={open ? classes.img : classes.imgClose} alt="avatar" src={imgUrl ? imgUrl : avatar}></img>
      <p className={classes.useremail}>{!!props.open ? email : null}</p>
    </div>
  );
}
export default Avatar;
