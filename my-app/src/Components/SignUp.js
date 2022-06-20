import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { createUseStyles } from "react-jss";
import { useState, useEffect } from "react";
import { useUserAuth, UserAuthContext } from "../context/UserAuthContext";
import { writeUserData, storage, auth } from "./firebase";
import {
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import paths from "../constants/Paths";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import Card from "./Card";
import HomeIcon from "./Nav-Bar/HomeIcon";
import AdminRegister from "./ModalMessages/AdminRegister";
import Rolls from "../constants/Rolls";
import { signOut } from "firebase/auth";
import NavMainBar from "./Nav-Bar/HomePageNavBar";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import formatTaxCode from "../utils/formatTaxCode";

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
      bottom: 12,
    },
    width: "100%",
    height: "100%",
  },
  signUp1: {
    display: "flex",
    margin: {
      top: 0,
      left: 85,
      right: 0,
      bottom: 12,
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
    marginTop: 10,
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
  loader: {
    position: "fixed",
    left: "50%",
    right: "50%",
    top: "50%",
    bottom: "50%",
  },
});

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [roll, setRoll] = useState("Client");
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { signUp } = useUserAuth();
  const [signInButtonHover, setSigInButtonHover] = useState(false);
  const [signInButtonActive, setSignInButtonActive] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [userNameError, setuserNameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [countError, setCountError] = useState("");
  const { Admin } = Rolls;

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const { USER_PROFILE_PATH, PROFILE_PATH } = paths;

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
    setProgress(0);
  };

  const phoneHandleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const taxCodeHandleInput = (e) => {
    const formattedTaxCode = formatTaxCode(e.target.value);
    setTaxCode(formattedTaxCode);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/${email}/avatar`);
    const uploadProcent = uploadBytesResumable(storageRef, file);
    uploadProcent.on(
      "state_changed",
      (snapshot) => {
        const proc = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(proc);
      },
      (err) => console.log(err),
      () =>
        getDownloadURL(uploadProcent.snapshot.ref).then((url) =>
          setAvatarUrl(url)
        )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (
        (!values.showPassword && password !== repeatedPassword) ||
        username.length < 4 ||
        name.length < 4 ||
        lastName.length < 4
      ) {
        if (!values.showPassword) {
          if (password !== repeatedPassword) {
            setError("Invalid input! Please enter valid information.");
          }
        }
        if (username.length < 4) {
          setuserNameError(true);
          setCountError("The input must be at least 3 character.");
        }
        if (name.length < 4) {
          setNameError(true);
          setCountError("The input must be at least 3 character.");
        }
        if (lastName.length < 4) {
          setlastNameError(true);
          setCountError("The input must be at least 3 character.");
        }
        if (password.length < 4) {
          setError("Invalid input! Please enter valid information. ");
        }
        if (email.length < 4 && email.includes("@") && email.includes(".")) {
          setError("Invalid input! Please enter valid information. ");
        }
        throw "Invalid input! Please enter valid information.";
      }
      let user = await signUp(email, password, roll);
      let UserData = {
        user: user.user,
        password: password,
        username: username,
        name: name,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        taxCode: taxCode,
        roll: roll,
        email: email,
        enabled: enabled,
        avatar: avatar,
      };
      await writeUserData(UserData);
      uploadFiles(avatar);
      if (roll === Admin) {
        setIsOpen(true);
      } else {
        navigate(`/${USER_PROFILE_PATH}`);
      }
    } catch (err) {
      // setError("Invalid input! Please enter valid information. ");
    }
  };
  const { user } = useUserAuth();

  useEffect(() => {
    if (!!user && !isOpen) {
      navigate(`/${PROFILE_PATH}`);
    }
  }, [PROFILE_PATH, isOpen, navigate, user]);

  return !!user && !isOpen ? (
    <div>
      <CircularProgress className={classes.loader} />
    </div>
  ) : (
    <>
      <HomeIcon />
      <div
        style={{
          display: "flex",
          marginTop: 20,
          marginBottom: 30,
          justifyContent: "center",
        }}
      >
        <Link to="/signin">
          <Button
            style={{
              position: "absolute",
              right: 50,
              top: 15,
            }}
            variant="outlined"
          >
            Sing In
          </Button>
        </Link>
        <Card>
          <div className={classes.useSpace}>
            <h1 className={classes.signUp}>Sign up</h1>
            {error && (
              <div style={{ color: "red", textAlign: "center" }}>
                {error || countError}
              </div>
            )}
            <br />

            <div className={classes.signUp}>
              <TextField
                error={error}
                className={classes.fields}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                type={"email"}
                id="emailId"
                label="Email"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <FormControl className={classes.fields} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  error={error}
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
            {!!values.showPassword || (
              <div id="repeatedPasswordDivId" className={classes.signUp}>
                <TextField
                  error={error}
                  className={classes.fields}
                  type="password"
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                  id="repeatedPassword"
                  label="Repeat password"
                  variant="outlined"
                />
              </div>
            )}
            <div className={classes.signUp}>
              <TextField
                error={userNameError}
                className={classes.fields}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="usernameId"
                label="Username"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <TextField
                error={nameError}
                className={classes.fields}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="nameId"
                label="Name"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <TextField
                error={lastNameError}
                className={classes.fields}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="lastNameId"
                label="Last name"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <TextField
                // error={true}
                className={classes.fields}
                value={phoneNumber}
                onChange={(e) => {
                  phoneHandleInput(e);
                }}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="phoneNumberId"
                label="Phone number"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              {!avatarUrl ? null : <img alt="" src={avatarUrl}></img>}
              <div
                style={{
                  display: "flex",
                  margin: {
                    top: 0,
                    left: "auto",
                    right: "auto",
                    bottom: 10,
                  },
                  width: 300,
                }}
              ></div>
            </div>
            <div className={classes.signUp}>
              <TextField
                className={classes.fields}
                type={"date"}
                InputLabelProps={{ shrink: true }}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="dateOfBirthId"
                label="Date of birth"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <TextField
                className={classes.fields}
                value={taxCode}
                onChange={(e) => {
                  taxCodeHandleInput(e);
                }}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                id="taxCodeId"
                label="Tax code"
                variant="outlined"
              />
            </div>
            <div className={classes.signUp}>
              <FormControl className={classes.fields}>
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
            <div className={classes.signUp1}>
              <label htmlFor="contained-button-file">
                <Input
                  style={{
                    display: "none",
                  }}
                  accept="image/*"
                  id="contained-button-file"
                  onChange={handleChange}
                  multiple
                  type="file"
                />
                <PhotoCamera style={{ cursor: "pointer" }} />
              </label>
              <span>&nbsp; Upload avatar</span>
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
        </Card>
        {isOpen && (
          <AdminRegister
            title={"Wait for acception"}
            typography={
              "Thank you for registration. Please wait until site administrators will approve or reject your conditian as site administrator."
            }
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </>
  );
}

export default SignUp;
