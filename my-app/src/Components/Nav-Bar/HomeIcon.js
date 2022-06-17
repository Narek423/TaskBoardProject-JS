import React from "react";
import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";

const useStyle = createUseStyles(() => {
	return {
		homeicon: {
			flex: 2,
			color: "#0000e6",
			margin: "auto",
		},
		icon: {
			fontFamily: "monospace",
			fontSize: 25,
			color: "blue",
			cursor: "pointer",
			marginLeft: "10%",
		},
	};
});

function HomeIcon(params) {
	const classes = useStyle();
	const navigate = useNavigate();

	return (
		<div className={classes.homeicon}>
			<h3 onClick={() => navigate("/")} className={classes.icon}>
				HomeIcon
			</h3>
		</div>
	);
}

export default HomeIcon;
