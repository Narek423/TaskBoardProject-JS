import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyle = createUseStyles(() => {
  return {
    homeicon: {
      flex: 1,
      color: "#0000e6",
      margin: "0",
      padding: 0,
    },
    icon: {
      fontFamily: "monospace",
      fontSize: 40,
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      color: "#054570",
      cursor: "pointer",
      marginLeft: "10%",
      textShadow: "2px 3px 0 #c5c5c5",
    },
    iconSmall: {
      fontFamily: "monospace",
      fontSize: 40,
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      color: "#054570",
      cursor: "pointer",
      marginLeft: 22,
      textShadow: "2px 3px 0 #c5c5c5",
    },
    iconSignin: {
      fontFamily: "monospace",
      fontSize: 40,
      padding: 0,
      marginTop: 19,
      marginBottom: 0,
      marginLeft: 22,
      color: "#054570",
      cursor: "pointer",
      textShadow: "2px 3px 0 #c5c5c5",
    },
  };
});

function HomeIcon(params) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { signin } = params;
  const classes = useStyle();
  const navigate = useNavigate();

  return (
    <div className={signin ? null : classes.homeicon}>
      <h3
        onClick={() => navigate("/")}
        className={
          signin
            ? classes.iconSignin
            : smallScreen
            ? classes.iconSmall
            : classes.icon
        }
      >
        TaskBoard
      </h3>
    </div>
  );
}

export default HomeIcon;
