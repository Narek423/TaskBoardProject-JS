import React from "react";
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import paths from "../../constants/Paths";
import { useSharedStyles } from "../../styles/sharedStyles";

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

function Auth() {
  const classes = useSharedStyles();

  const { SIGN_IN_PATH, SIGN_UP_PATH } = paths;

  return (
    <div className={classes.auth}>
      <div className={classes.authBtns}>
        <ThemeProvider theme={theme}>
          <Link to={`/${SIGN_IN_PATH}`}>
            <button className={classes.signinBtn}>Sign in</button>
          </Link>
          <Link to={`/${SIGN_UP_PATH}`}>
            <button className={classes.signupBtn}>Sign up</button>
          </Link>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Auth;
