import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createUseStyles } from "react-jss";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState, useMemo } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import Card from "./Card";
import { Button } from "@mui/material";
import HomeIcon from "./Nav-Bar/HomeIcon";
import paths from "../constants/Paths";
import AdminRegister from "./ModalMessages/AdminRegister";
import Rolls from "../constants/Rolls";
import { get, getDatabase, ref, update } from "firebase/database";

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
      bottom: 13,
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
    marginTop: 0,
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

function resolveGetUserData(usr) {
  const dbRef = getDatabase();
  let clientData = {};
  return new Promise(function (resolve, reject) {
    if (!!usr) {
      const uid = usr.uid || usr.user.uid;
      get(ref(dbRef, "users/" + uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            clientData = snapshot.val();
            resolve(clientData);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
}
// function getUserData(usr) {
//   const userData = resolveGetUserData(usr);
//   console.log(userData);
//   return userData;
// }

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInButtonHover] = useState(false);
  const [signInButtonActive] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [newRoll, setNewRoll] = useState("");
  const [newEnabled, setNewEnabled] = useState("");
  const { Admin } = Rolls;
  const { USER_PROFILE_PATH, PROFILE_PATH } = paths;
  const [title, setTitle] = useState("");
  const [typography, setTypography] = useState("");
  const dbRef = getDatabase();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!!user && !isOpen) {
      const dbRef = getDatabase();
      get(ref(dbRef, "users/" + user.uid || user.user.uid))
        .then((snapshot) => {
          setData(snapshot.val());
          setIsLoading(false);
          if (
            snapshot.val().roll === Admin &&
            snapshot.val().enabled === "false"
          ) {
            setTitle("Waiting for acception");
            setTypography(
              "Hi dear user. Please be informed that your condition as an admin user not approved yet. You can use your account as soon as it will be confirmed."
            );
            setIsOpen(true);
          } else if (
            snapshot.val().roll === Admin &&
            snapshot.val().enabled === "disabled"
          ) {
            setTitle("Access denied");
            setTypography(
              "Hi dear user. Unfortunately your request to become an admin user was rejected by syte administrator."
            );
            setIsOpen(true);
          } else {
            setIsOpen(false);
            navigate(`/${USER_PROFILE_PATH}`);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(true);
        });
    }
  }, [Admin, USER_PROFILE_PATH, data, isOpen, navigate, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Navigate to={`/${PROFILE_PATH}`} />
  ) : (
    <>
      <HomeIcon />
      <div
        style={{
          height: "70vh",
          display: "flex",
          marginTop: 20,
          marginBottom: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/signup">
          <Button
            style={{
              position: "absolute",
              right: 50,
              top: 15,
            }}
            variant="outlined"
          >
            Sing Up
          </Button>
        </Link>
        <Card>
          <div className={classes.useSpace}>
            <h1 className={classes.signIn}>Sign in</h1>
            {error && (
              <div style={{ color: "red", textAlign: "center" }}> {error} </div>
            )}
            <br />
            <div className={classes.signIn}>
              <TextField
                className={classes.fields}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                type={"email"}
                id="emailId"
                label="Email (Login)"
                variant="outlined"
              />
            </div>
            <div className={classes.signIn}>
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
                  onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>

            <div className={classes.signIn} id="buttons">
              <button
                className={
                  signInButtonHover
                    ? classes.signInButtOnHover
                    : signInButtonActive
                    ? classes.signInButtonActive
                    : classes.signInButton
                }
                onClick={handleSubmit}
                id="buttonsignIn"
                variant="contained"
                color="secondary"
              >
                Sign in
              </button>
            </div>
          </div>
          <Outlet />
        </Card>
        {isOpen && (
          <AdminRegister
            title={title}
            typography={typography}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </>
  );
}

export default SignIn;
