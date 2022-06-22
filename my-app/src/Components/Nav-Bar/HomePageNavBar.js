import React from "react";
import HomeIcon from "./HomeIcon";
import { createUseStyles } from "react-jss";
import Auth from "./Auth";
import NavBarBtns from "./NavBarBtns";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyle = createUseStyles(() => {
  return {
    nav_bar: {
      flex: 1,
      width: "100vw",
      margin: "0 auto",
      height: "85px",
      backgroundColor: "#ffffff00",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 15px 10px -15px #111",
    },
    wrapper: {
      margin: "0 0",
      display: "flex",
      overflow: "hidden",
      paddingBottom: 10,
    },
  };
});

function NavMainBar(props) {
  const classes = useStyle();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.wrapper}>
      <div className={classes.nav_bar}>
        <HomeIcon />
        {!smallScreen && <NavBarBtns refs={props} />}
        <Auth />
      </div>
    </div>
  );
}

export default NavMainBar;
