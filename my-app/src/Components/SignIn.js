import { Outlet, Link } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { createUseStyles } from "react-jss";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { signin } from "../firebase";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const useStyles = createUseStyles({
	header: {
		backgroundColor: "#f50157",
		fontFamily: "Palatino",
		fontSize: 50,
		padding: 25,
		margin: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 5,
		},
	},
	signIn: {
		display: "flex",
		justifyContent: "center",
		margin: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 10,
		},
	},
	fields: {
		width: 300,
	},
	buttons: {
		margin: 5,
	},
	homeButtons: {
		position: "fixed",
		right: 0,
	},
	useSpace: {
		marginTop: 70,
	},
	signInButton: {
		appearance: "none",
		backgroundColor: "#FFFFFF",
		borderRadius: "40em",
		borderStyle: "none",
		boxShadow: "#ADCFFF 0 -12px 6px inset",
		boxSizing: "border-box",
		color: "#000000",
		cursor: "pointer",
		display: "inline-block",
		fontFamily: "-apple-system,sans-serif",
		fontSize: "1.2rem",
		fontWeight: "700",
		letterSpacing: "-.24px",
		margin: "0",
		outline: "none",
		padding: "1rem 1.3rem",
		quotes: "auto",
		textAlign: "center",
		textDecoration: "none",
		transition: "all .15s",
		userSelect: "none",
		webkitUserSelect: "none",
		touchAction: "manipulation",
		"&:hover": {
			backgroundColor: "#FFC229",
			boxShadow: "#FF6314 0 -6px 8px inset",
			transform: "scale(1.125)",
		},
		"&:active": {
			transform: "scale(1.025)",
		},
	},
});

function SignIn(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInButtonHover, setSigInButtonHover] = useState(false);
	const [signInButtonActive, setSignInButtonActive] = useState(false);

	const classes = useStyles();
	const [values, setValues] = React.useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// async function usersignIn() {
	// 	try {
	// 		await signin(email, password);
	// 		setEmail("");
	// 		setPassword("");
	// 	} catch (e) {
	// 		console.log("Error");
	// 	}
	// }

	return (
		<>
			<div className={classes.useSpace}>
				<h1 className={classes.signIn}>Sign in</h1>
				<div className={classes.signIn}>
					<TextField
						className={classes.fields}
						onChange={(e) => setEmail(e.target.value)}
						type={"email"}
						id='emailId'
						label='eMail (Login)'
						variant='outlined'
					/>
				</div>
				<div className={classes.signIn}>
					<FormControl
						className={classes.fields}
						sx={{ m: 1, width: "25ch" }}
						variant='outlined'
					>
						<InputLabel htmlFor='outlined-adornment-password'>
							Password
						</InputLabel>
						<OutlinedInput
							id='passwordId'
							type={values.showPassword ? "text" : "password"}
							value={values.password}
							onChange={handleChange("password")}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
						/>
					</FormControl>
				</div>

				<div className={classes.signIn} id='buttons'>
					<button
						className={
							signInButtonHover
								? classes.signInButtOnHover
								: signInButtonActive
								? classes.signInButtonActive
								: classes.signInButton
						}
						// onClick={usersignIn}
						onHover={() => {
							setSigInButtonHover(true);
							setSignInButtonActive(false);
						}}
						onActivate={() => {
							setSigInButtonHover(false);
							setSignInButtonActive(true);
						}}
						id='buttonsignIn'
						variant='contained'
						color='secondary'
					>
						Sign in
					</button>
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default SignIn;
