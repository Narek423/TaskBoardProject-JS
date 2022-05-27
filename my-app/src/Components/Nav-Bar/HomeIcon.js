import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyle = createUseStyles(() => {
	return {
		homeicon: {
			flex: 1,
			position: "relative",
			color: "#0000e6",
			cursor: "pointer",
		},
		icon: {
			position: "absolute",
			left: 150,
			fontFamily: "monospace",
			fontSize: 25,
			color: "blue",
		},
	};
});

function HomeIcon(params) {
	const classes = useStyle();

	return (
		<div className={classes.homeicon}>
			<Link to='/'>
				<h3 className={classes.icon}>HomeIcon</h3>
			</Link>
		</div>
	);
}

export default HomeIcon;
