import React from "react";
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
	status: {
		danger: "#e53e3e",
	},
	palette: {
		primary: {
			main: "#0000e6",
			darker: "#053e85",
		},
	},
});

const useStyle = createUseStyles(() => {
	return {
		auth: {
			flex: 1,
			margin: 'auto'
		},
	};
});

function Auth() {
	const classes = useStyle();

	return (
		<div className={classes.auth}>
			<div className={classes.authBtns}>
				<ThemeProvider theme={theme}>
					<Link to='/signup'>
						<Button
							// style={{
							// 	position: "absolute",
							// 	right: 50,
							// 	top: 15,
							// }}
							variant='outlined'
						>
							Sing In
						</Button>
					</Link>
					<Link to='/signin'>
						<Button
							// style={{
							// 	position: "absolute",
							// 	right: 140,
							// 	top: 15,
							// }}
							variant='outlined'
						>
							Sing Up
						</Button>
					</Link>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default Auth;
