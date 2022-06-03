import React, { useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { userData } from "../../../context/UserData";
import avatar from "../../avatar/avatar.jpg";
import { avatarUrl } from "../CreateNewTask/FireBaseFileUpload";

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
			width: "25%",
			borderRadius: 60,
			// borderBlockColor: "blue",
		},
	};
});

function UserAvatar() {

  const { email } = useContext(userData);
  const classes = useStyle();

 
  
  return (
    <div className={classes.avatar}>
      <img 
         className={classes.img}
         alt="avatar" 
         src={avatar}>
      </img>
      <p className={classes.useremail}>{email}</p>
    </div>
  );
}
export default UserAvatar;
