import React, { useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
// import { userData } from "../../context/UserData";

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
	const { user } = useUserAuth();
	console.log("avatr", user);
	const classes = useStyle();

	return (
		<div className={classes.avatar}>
			<img
				className={classes.img}
				alt='avatar'
				src={
					"https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
				}
			></img>
			<p className={classes.useremail}>{user.user?.email || user?.email}</p>
		</div>
	);
}
export default UserAvatar;
