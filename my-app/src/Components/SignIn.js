import { Outlet, Link, useNavigate } from "react-router-dom";
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
import { useUserAuth } from "../context/UserAuthContext";
import NavMainBar from "./Nav-Bar/HomePageNavBar";
import paths from "../constants/Paths";

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
	const [signInButtonHover] = useState(false);
	const [signInButtonActive] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const {USER_PROFILE_PATH} = paths;

	const classes = useStyles();
	const [values, setValues] = useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { signIn, user } = useUserAuth();
	if (user) navigate(`/${USER_PROFILE_PATH}`);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await signIn(email, password);
			navigate(`/${USER_PROFILE_PATH}`);
		} catch (err) {
			setError(err.message);
		}
	};

	return user ? null : (
		<>
			<NavMainBar />
			<div className={classes.useSpace}>
				<h1 className={classes.signIn}>Sign in</h1>
				{error && (
					<div style={{ color: "red", textAlign: "center" }}> {error} </div>
				)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
						onClick={handleSubmit}
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
