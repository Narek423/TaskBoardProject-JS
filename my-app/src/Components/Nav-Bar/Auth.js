import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import paths from "../../constants/Paths";
import { useSharedStyles } from "../../styles/sharedStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useSharedStyles();

  const { SIGN_IN_PATH, SIGN_UP_PATH } = paths;

  return (
    <div className={classes.auth}>
      <div className={classes.authBtns}>
        <ThemeProvider theme={theme}>
          <div
            style={
              smallScreen
                ? {
                    float: "rigth",
                    marginRight: "20px",
                    minWidth: "200px",
                    display: "inline-block",
                    textAlign: "right",
                    width: "95%",
                  }
                : {
                    marginRight: "5px",
                    minWidth: "200px",
                  }
            }
          >
            <Link to={`/${SIGN_IN_PATH}`}>
              <button className={classes.signinBtn}>Sign in</button>
            </Link>
            <Link to={`/${SIGN_UP_PATH}`}>
              <button className={classes.signupBtn}>Sign up</button>
            </Link>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Auth;
