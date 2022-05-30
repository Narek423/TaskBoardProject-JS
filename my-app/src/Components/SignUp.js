import { Outlet, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useUserAuth } from "../context/UserAuthContext";
import NavMainBar from "./Nav-Bar/NavMainBar";

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
  signUp: {
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

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [roll, setRoll] = useState("Client");
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");

  const [signInButtonHover, setSigInButtonHover] = useState(false);
  const [signInButtonActive, setSignInButtonActive] = useState(false);
  const navigate = useNavigate();
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

  const { signUp } = useUserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, roll);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  // async function () {
  // 	try {
  // 		await signup(
  // 			email,
  // 			password,
  // 			name,
  // 			lastName,
  // 			dateOfBirth,
  // 			phoneNumber,
  // 			taxCode,
  // 			roll,
  // 			enabled
  // 		);
  // 		console.log(signin(email, password));
  // 		let currentUserData = await signin(email, password).then((data) => data);
  // 		props.updateUser(currentUserData);
  // 		setEmail("");
  // 		setPassword("");
  // 		setRepeatedPassword("");
  // 		setName("");
  // 		setLastName("");
  // 		setPhoneNumber("");
  // 		setDateOfBirth("");
  // 		setTaxCode("");
  // 		setRoll("");
  // 		setEnabled("");
  // 	} catch (e) {
  // 		console.log("Error");
  // 	}
  // }

  return (
    <>
      <NavMainBar />
      <div className={classes.useSpace}>
        <h1 className={classes.signUp}>Sign up</h1>
        {error && (
          <div style={{ color: "red", textAlign: "center" }}> {error} </div>
        )}
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
            id="emailId"
            label="Email (Login)"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <FormControl
            className={classes.fields}
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="passwordId"
              type={values.showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        {!!values.showPassword || (
          <div id="repeatedPasswordDivId" className={classes.signUp}>
            <TextField
              className={classes.fields}
              type="password"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              id="repeatedPassword"
              label="Repeat password"
              variant="outlined"
            />
          </div>
        )}
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="nameId"
            label="Name"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastNameId"
            label="UsLaster name"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumberId"
            label="Phone number"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            type={"date"}
            InputLabelProps={{ shrink: true }}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            id="dateOfBirthId"
            label="Date of birth"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <TextField
            className={classes.fields}
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            id="taxCodeId"
            label="Tax code"
            variant="outlined"
          />
        </div>
        <div className={classes.signUp}>
          <FormControl className={classes.fields} sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="inputRollId">Roll</InputLabel>
            <Select
              labelId="inputRollId"
              id="RollId"
              value={roll}
              label="Roll"
              onChange={(e) => {
                setRoll(e.target.value);
                setEnabled(e.target.value === "Admin" ? false : true);
              }}
            >
              <MenuItem value={"Client"}>Client</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.signUp} id="buttons">
          <button
            className={
              signInButtonHover
                ? classes.signInButtOnHover
                : signInButtonActive
                ? classes.signInButtonActive
                : classes.signInButton
            }
            onClick={handleSubmit}
            id="buttonSignUp"
            variant="contained"
            color="secondary"
          >
            Sign up
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SignUp;
