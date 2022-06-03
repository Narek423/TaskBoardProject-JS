import React from "react";
import HomeIcon from "./HomeIcon";
import { createUseStyles } from "react-jss";
import Auth from "./Auth";
import NavBarBtns from "./NavBarBtns";
import backImg from "../img/subtle.png"

const useStyle = createUseStyles(() => {
  return {
    nav_bar: { 
      height: "100vh",
      // backgroundImage: `url(${backImg})`,
      // backgroundSize: "auto auto",
      display: "flex",
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        height: 10,
      },
      "&::-webkit-scrollbar-track": {
        background: "white",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#019CAD",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#019CAD",
      },
      

    },
  };
});

function NavMainBar() {
  const classes = useStyle();

  return (
    <div className={classes.nav_bar}>
      <HomeIcon />
      <NavBarBtns />
      <Auth />
    </div>
  );
}

export default NavMainBar;
